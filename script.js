// Word Counter Logic
const textInput = document.getElementById('textInput');
const clearBtn = document.getElementById('clearBtn');
const copyBtn = document.getElementById('copyBtn');

// Statistics elements
const wordCountEl = document.getElementById('wordCount');
const charCountEl = document.getElementById('charCount');
const charCountNoSpaceEl = document.getElementById('charCountNoSpace');
const paragraphCountEl = document.getElementById('paragraphCount');
const sentenceCountEl = document.getElementById('sentenceCount');
const readingTimeEl = document.getElementById('readingTime');
const avgWordLengthEl = document.getElementById('avgWordLength');
const avgSentenceLengthEl = document.getElementById('avgSentenceLength');
const avgParagraphLengthEl = document.getElementById('avgParagraphLength');

// Average reading speed (words per minute)
const READING_SPEED = 200;

/**
 * Count words in text
 */
function countWords(text) {
    const trimmed = text.trim();
    if (!trimmed) return 0;
    return trimmed.split(/\s+/).length;
}

/**
 * Count characters including spaces
 */
function countCharacters(text) {
    return text.length;
}

/**
 * Count characters excluding spaces
 */
function countCharactersNoSpace(text) {
    return text.replace(/\s/g, '').length;
}

/**
 * Count paragraphs (separated by line breaks)
 */
function countParagraphs(text) {
    const trimmed = text.trim();
    if (!trimmed) return 0;
    return trimmed.split(/\n\n+/).filter(para => para.trim().length > 0).length;
}

/**
 * Count sentences (end with . ! or ?)
 */
function countSentences(text) {
    const sentenceRegex = /[.!?]+/g;
    const matches = text.match(sentenceRegex);
    return matches ? matches.length : 0;
}

/**
 * Calculate reading time in minutes
 */
function calculateReadingTime(wordCount) {
    const minutes = Math.ceil(wordCount / READING_SPEED);
    return minutes;
}

/**
 * Calculate average word length
 */
function calculateAverageWordLength(text) {
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    if (words.length === 0) return 0;
    const totalChars = words.reduce((sum, word) => sum + word.length, 0);
    return (totalChars / words.length).toFixed(2);
}

/**
 * Calculate average sentence length
 */
function calculateAverageSentenceLength(wordCount, sentenceCount) {
    if (sentenceCount === 0) return 0;
    return (wordCount / sentenceCount).toFixed(2);
}

/**
 * Calculate average paragraph length
 */
function calculateAverageParagraphLength(wordCount, paragraphCount) {
    if (paragraphCount === 0) return 0;
    return (wordCount / paragraphCount).toFixed(2);
}

/**
 * Update all statistics
 */
function updateStatistics() {
    const text = textInput.value;

    // Calculate all metrics
    const words = countWords(text);
    const chars = countCharacters(text);
    const charsNoSpace = countCharactersNoSpace(text);
    const paragraphs = countParagraphs(text);
    const sentences = countSentences(text);
    const readingTime = calculateReadingTime(words);
    const avgWordLength = calculateAverageWordLength(text);
    const avgSentenceLength = calculateAverageSentenceLength(words, sentences);
    const avgParagraphLength = calculateAverageParagraphLength(words, paragraphs);

    // Update DOM
    wordCountEl.textContent = words.toLocaleString();
    charCountEl.textContent = chars.toLocaleString();
    charCountNoSpaceEl.textContent = charsNoSpace.toLocaleString();
    paragraphCountEl.textContent = paragraphs;
    sentenceCountEl.textContent = sentences;
    readingTimeEl.textContent = readingTime === 0 ? '0 min' : `${readingTime} min`;

    avgWordLengthEl.textContent = avgWordLength;
    avgSentenceLengthEl.textContent = avgSentenceLength;
    avgParagraphLengthEl.textContent = avgParagraphLength;
}

/**
 * Clear text and reset statistics
 */
function clearText() {
    textInput.value = '';
    updateStatistics();
    textInput.focus();
}

/**
 * Copy statistics to clipboard
 */
function copyStatistics() {
    const text = textInput.value;
    const words = countWords(text);
    const chars = countCharacters(text);
    const charsNoSpace = countCharactersNoSpace(text);
    const paragraphs = countParagraphs(text);
    const sentences = countSentences(text);
    const readingTime = calculateReadingTime(words);

    const stats = `Word Counter Statistics:
Words: ${words}
Characters: ${chars}
Characters (no spaces): ${charsNoSpace}
Paragraphs: ${paragraphs}
Sentences: ${sentences}
Reading Time: ${readingTime} minutes`;

    navigator.clipboard.writeText(stats).then(() => {
        // Show feedback
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        setTimeout(() => {
            copyBtn.textContent = originalText;
        }, 2000);
    }).catch(() => {
        // Fallback for older browsers
        alert('Failed to copy. Please try again.');
    });
}

// Event listeners
textInput.addEventListener('input', updateStatistics);
clearBtn.addEventListener('click', clearText);
copyBtn.addEventListener('click', copyStatistics);

// Initialize statistics on page load
document.addEventListener('DOMContentLoaded', () => {
    updateStatistics();
    // Set focus to textarea for better UX
    textInput.focus();
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
