const { formcatOrder, vowelOrder, formcatVerbal } = require('./constants');

function wrapArabicText(text) {
    const hasArabicChars = /[\u0600-\u06FF]/.test(text);
    if (hasArabicChars) {
        return text.replace(/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]+/g, match => `<span class="arabic-text">${match}</span>`);
    }
    return text;
}

const getR2Vowel = (item) => {
    const vowels = ['َ', 'ِ', 'ُ'];
    const r2 = item.item[3];
    return vowels.includes(r2) ? r2 : null;
};

const sortItems = (items, r1, r2, r3, r4, r5, r6, r7) => {
    return [...items].sort((a, b) => {
        if (formcatVerbal.includes(a.formcat) && formcatVerbal.includes(b.formcat)) {
            const formcatDiff = formcatOrder.indexOf(a.formcat) - formcatOrder.indexOf(b.formcat);
            if (formcatDiff === 0 && a.formcat === 'I' && b.formcat === 'I') {
                const vowelA = getR2Vowel(a);
                const vowelB = getR2Vowel(b);
                if (vowelA && vowelB) {
                    return vowelOrder.indexOf(vowelA) - vowelOrder.indexOf(vowelB);
                }
            }
            return formcatDiff;
        }
        return 0;
    });
};

const transliterationMap = {
    'ء': 'ʾ', 'أ': 'ʾ', 'إ': 'ʾ', 'ؤ': 'ʾ', 'ئ': 'ʾ',
    'ب': 'b', 'ت': 't', 'ث': 'ṯ', 'ج': 'ǧ', 'ح': 'ḥ',
    'خ': 'ẖ', 'د': 'd', 'ذ': 'ḏ', 'ر': 'r', 'ز': 'z',
    'س': 's', 'ش': 'š', 'ص': 'ṣ', 'ض': 'ḍ', 'ط': 'ṭ',
    'ظ': 'ẓ', 'ع': 'ʿ', 'غ': 'ġ', 'ف': 'f', 'ق': 'q',
    'ك': 'k', 'ل': 'l', 'م': 'm', 'ن': 'n', 'ه': 'h',
    'و': 'w', 'ي': 'y', 'ا': 'ā', 'َ': 'a', 'ِ': 'i',
    'اِ': 'i', 'ُ': 'u', 'ة': 'ẗ', 'آ': 'Aa', 'ً': 'An',
    'ٍ': 'In', 'ٌ': 'Un', 'اِ': 'I', 'اُ': 'u'
};

const transliterate = (text) => {
    const chars = text.split('');
    let result = '';
    for (let i = 0; i < chars.length; i++) {
        const currentChar = chars[i];
        const nextChar = chars[i + 1];
        if (currentChar === 'ْ') {
            continue;
        }
        if (currentChar === 'ا' && nextChar === 'ِ') {
            result += 'i';
            i++;
        } else if (nextChar === 'ّ') {
            result += transliterationMap[currentChar] + transliterationMap[currentChar];
            i++;
        } else {
            result += transliterationMap[currentChar] || currentChar;
        }
    }
    return result;
};

module.exports = {
    wrapArabicText,
    getR2Vowel,
    sortItems,
    transliterationMap,
    transliterate
};
