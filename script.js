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

function loadGenesys() {
    if (window._genesysLoaded) return;
    window._genesysLoaded = true;

    if (!window.Genesys) {
        window.Genesys = function () {
            (window.Genesys.q = window.Genesys.q || []).push(arguments);
        };
    }

    window.Genesys.t = 1 * new Date();
    window.Genesys.c = {
        environment: 'prod-usw2',
        deploymentId: 'c641aa60-6ebc-4aa9-8737-5eb53fe5358b'
    };

    var script = document.createElement('script');
    script.async = true;
    script.charset = 'utf-8';
    script.src = 'https://apps.usw2.pure.cloud/genesys-bootstrap/genesys.min.js';
    document.head.appendChild(script);
}

function tryGenesysOpen() {
    if (typeof Genesys !== 'function') return false;

    try {
        Genesys('webchat.open');
        return true;
    } catch (e) {}

    try {
        Genesys('command', 'webchat.open');
        return true;
    } catch (e) {}

    try {
        Genesys('webchat', 'open');
        return true;
    } catch (e) {}

    return false;
}

function openGenesysChat() {
    loadGenesys();

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
    loadGenesys();

    const footerBtn = document.getElementById('genesys-footer-btn');
    if (footerBtn) {
        footerBtn.addEventListener('click', openGenesysChat);
    }

    const messageBtn = document.getElementById('genesys-message-btn');
    if (messageBtn) {
        messageBtn.addEventListener('click', openGenesysChat);
    }
});
