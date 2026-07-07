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
    if (window._genesysLoaded || window.Genesys) return;
    window._genesysLoaded = true;
    (function (g, e, n, es, ys) {
        g['_genesysJs'] = e;
        g[e] = g[e] || function () {
            (g[e].q = g[e].q || []).push(arguments)
        };
        g[e].t = 1 * new Date();
        g[e].c = es;
        ys = document.createElement('script'); ys.async = 1; ys.src = n; ys.charset = 'utf-8'; document.head.appendChild(ys);
    })(window, 'Genesys', 'https://apps.usw2.pure.cloud/genesys-bootstrap/genesys.min.js', {
        environment: 'prod-usw2',
        deploymentId: 'c641aa60-6ebc-4aa9-8737-5eb53fe5358b'
    });
}

function openGenesysChat() {
    loadGenesys();

    var tryOpen = function () {
        if (window.Genesys) {
            try {
                if (typeof Genesys === 'function') {
                    Genesys('webchat.open');
                }
            } catch (e) {}
            return true;
        }
        return false;
    };

    if (!tryOpen()) {
        var interval = setInterval(function () {
            if (tryOpen()) {
                clearInterval(interval);
            }
        }, 500);
        setTimeout(function () { clearInterval(interval); }, 30000);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const inquiryForm = document.getElementById('inquiry-form');
    if (inquiryForm) {
        // keep the existing handler attached in HTML, nothing to do here
    }

    const assistButton = document.querySelector('.assistance-section button');
    if (assistButton) {
        assistButton.addEventListener('click', openGenesysChat);
    }
});
