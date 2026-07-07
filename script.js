function scrollToInquiry() {
    document.getElementById('inquiry').scrollIntoView({ behavior: 'smooth' });
}

function handleInquiry(event) {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value.trim();
    const loanType = form.loanType.value;
    const amount = form.amount.value;
    const response = document.getElementById('ava-response');

    if (!name) {
        response.textContent = 'Please enter your name so AVA can assist you.';
        return;
    }

    response.textContent = `Hello ${name}! AVA can help you with ${loanType.toLowerCase()} options, eligibility checks, pre-approval guidance, insurance recommendations, and advisor escalation if needed.`;

    if (amount) {
        response.textContent += ` Your requested loan amount is ${amount}.`;
    }
}

function openAVAPopup() {
    const popup = document.getElementById('ava-chat-popup');
    const input = document.getElementById('ava-chat-input');

    if (popup) {
        popup.classList.add('show');
        popup.setAttribute('aria-hidden', 'false');
    }

    if (input) {
        input.focus();
    }
}

function closeAVAPopup() {
    const popup = document.getElementById('ava-chat-popup');

    if (popup) {
        popup.classList.remove('show');
        popup.setAttribute('aria-hidden', 'true');
    }
}

function appendChatMessage(text, sender) {
    const messages = document.getElementById('ava-chat-messages');

    if (!messages) {
        return;
    }

    const message = document.createElement('div');
    message.className = `message ${sender}`;
    message.textContent = text;
    messages.appendChild(message);
    messages.scrollTop = messages.scrollHeight;
}

function getAVAReply(userText) {
    const text = userText.toLowerCase();

    if (text.includes('eligibility') || text.includes('eligible')) {
        return 'I can help with a quick eligibility check based on income, employment type, and credit profile.';
    }

    if ((text.includes('pre') && text.includes('approval')) || text.includes('approval')) {
        return 'Pre-approval usually involves income proof, identity documents, and an initial credit review.';
    }

    if (text.includes('insurance')) {
        return 'We can recommend loan protection insurance options that support your family and financial goals.';
    }

    if (text.includes('advisor') || text.includes('human') || text.includes('agent')) {
        return 'I can connect you with a loan advisor for a more detailed discussion.';
    }

    if (text.includes('document')) {
        return 'Common documents include ID proof, address proof, income proof, and property-related papers.';
    }

    return 'I can help with home loan information, eligibility, pre-approval, documents, insurance, and advisor support.';
}

function showAVAMessage() {
    const response = document.getElementById('ava-response');

    if (response) {
        response.textContent = 'AVA is ready to assist you with home loan information, eligibility, and next steps.';
    }

    openAVAPopup();
}

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('ava-chat-form');
    const input = document.getElementById('ava-chat-input');
    const closeButton = document.getElementById('close-ava-chat');
    const bubbleButton = document.getElementById('ava-bubble');

    if (bubbleButton) {
        bubbleButton.addEventListener('click', function () {
            openAVAPopup();
        });
    }

    if (form && input) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            const userText = input.value.trim();

            if (!userText) {
                return;
            }

            appendChatMessage(userText, 'user');
            input.value = '';

            window.setTimeout(function () {
                appendChatMessage(getAVAReply(userText), 'bot');
            }, 400);
        });
    }

    if (closeButton) {
        closeButton.addEventListener('click', closeAVAPopup);
    }
});
