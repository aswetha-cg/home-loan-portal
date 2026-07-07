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

function tryGenesysOpen() {
    if (typeof Genesys !== 'function') return false;

    var commands = [
        ['webchat.open'],
        ['command', 'webchat.open'],
        ['webchat', 'open'],
        ['webchat.start'],
        ['command', 'webchat.start'],
        ['webchat', 'start']
    ];

    for (var i = 0; i < commands.length; i += 1) {
        try {
            Genesys.apply(null, commands[i]);
            return true;
        } catch (e) {
            // ignore and try next
        }
    }

    return false;
}

function openGenesysChat() {
    if (tryGenesysOpen()) {
        return;
    }

    var attempt = 0;
    var interval = setInterval(function () {
        attempt += 1;
        if (tryGenesysOpen() || attempt >= 12) {
            clearInterval(interval);
        }
    }, 500);
}

document.addEventListener('DOMContentLoaded', function () {
    const footerBtn = document.getElementById('genesys-footer-btn');
    if (footerBtn) {
        footerBtn.addEventListener('click', function () {
            openGenesysChat();
        });
    }
});
