const formcatOrder = [
    'I', 'I passif', 'II', 'II passif', 'III', 'III passif', 'IV', 'IV passif', 'V', 'V passif',
    'VI', 'VI passif', 'VII', 'VII passif', 'VIII', 'VIII passif', 'IX', 'IX passif', 'X', 'X passif',
    'XI', 'XI passif', 'XII', 'XII passif', 'XIII', 'XIII passif', 'XIV', 'XIV passif', 'XV', 'XV passif',
    'IQ', 'IQ passif', 'IIQ', 'IIQ passif', 'IIIQ', 'IIIQ passif', 'IVQ', 'IVQ passif', 'F >4',
    'Nom', 'Adjectif', 'Adverbe', 'Elatif', 'Interjection', 'Participe actif', 'Participe passif', 'Particule',
    'Préposition', 'Pronom démonstratif', 'Pronom indéterminé', 'Pronom interrogatif', 'Pronom personnel', 'Pronom possessif'
];

const formcatVerbal = [
    'I', 'I passif', 'II', 'II passif', 'III', 'III passif', 'IV', 'IV passif', 'V', 'V passif',
    'VI', 'VI passif', 'VII', 'VII passif', 'VIII', 'VIII passif', 'IX', 'IX passif', 'X', 'X passif',
    'XI', 'XI passif', 'XII', 'XII passif', 'XIII', 'XIII passif', 'XIV', 'XIV passif', 'XV', 'XV passif',
    'IQ', 'IQ passif', 'IIQ', 'IIQ passif', 'IIIQ', 'IIIQ passif', 'IVQ', 'IVQ passif', 'F >4'
];

const voyinaccOptions = ['A', 'AI', 'AO', 'AIO', 'AOI', 'I', 'IA', 'IO', 'IAO', 'IOA', 'O', 'OA', 'OI', 'OAI', 'OIA'];

const origineOptions = ['Africain', 'Africain moderne', 'Algérien', 'Algérien vulgaire', 'Arabe vulgaire', 'Egyptien moderne', 'Egyptien', 'Français', 'Grec', 'Italien', 'Marocain', 'Moderne', 'Persan', 'Turc'];

const vowelOrder = ['َ', 'ِ', 'ُ'];

const verbalForms = [
    { form: 'فَعَلَ', formcat: 'I' },
    { form: 'فَعَّلَ', formcat: 'II' },
    { form: 'فَاعَلَ', formcat: 'III' },
    { form: 'أَفْعَلَ', formcat: 'IV' },
    { form: 'تَفَعَّلَ', formcat: 'V' },
    { form: 'تَفَاعَلَ', formcat: 'VI' },
    { form: 'اِنْفَعَلَ', formcat: 'VII' },
    { form: 'اِفْتَعَلَ', formcat: 'VIII' },
    { form: 'إِفْعَلَّ', formcat: 'IX' },
    { form: 'اِسْتَفْعَلَ', formcat: 'X' },
    { form: 'اِفْعَالَّ', formcat: 'XI' },
    { form: 'اِفْعَوْعَلَ', formcat: 'XII' },
    { form: 'اِفْعَوَّلَ', formcat: 'XIII' },
    { form: 'اِفْعَنْلَلَ', formcat: 'XIV' },
    { form: 'اِعْعَنْلَا', formcat: 'XV' },
    { form: 'فَعْلَلَ', formcat: 'IQ' },
    { form: 'تَفَعْلَلَ', formcat: 'IIQ' },
    { form: 'اِفْعَنْلَلَ', formcat: 'IIIQ' },
    { form: 'اِفْعَلَلَّ', formcat: 'IVQ' }
];

module.exports = {
    formcatOrder,
    formcatVerbal,
    voyinaccOptions,
    origineOptions,
    vowelOrder,
    verbalForms
};
