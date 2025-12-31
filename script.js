function toggleFullscreen() {
    const elem = document.documentElement;
    
    if (!document.fullscreenElement) {
        // Entra em fullscreen nativo (F11)
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) { /* Safari */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE11 */
            elem.msRequestFullscreen();
        }
        
        // Adiciona a classe para estilização customizada
        document.body.classList.add('fullscreen-mode');
    }
}

function exitFullscreen() {
    // Sai do fullscreen nativo
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
    }
    
    // Remove a classe de estilização
    document.body.classList.remove('fullscreen-mode');
    
    // Força o reflow do DOM
    void document.body.offsetHeight;
}

// Detecta mudanças no estado de fullscreen
document.addEventListener('fullscreenchange', function() {
    if (!document.fullscreenElement) {
        document.body.classList.remove('fullscreen-mode');
    }
});

// Sair do fullscreen com ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && document.body.classList.contains('fullscreen-mode')) {
        exitFullscreen();
    }
});

function downloadPDF() {
    // Configura para impressão em 1 página
    const style = document.createElement('style');
    style.textContent = `
        @media print {
            body { 
                transform: scale(0.95);
                transform-origin: top center;
            }
            .resume-content {
                font-size: 0.85em;
            }
            .section-title {
                margin-top: 15px;
                margin-bottom: 8px;
            }
            .experience-item {
                margin-bottom: 12px;
            }
        }
    `;
    document.head.appendChild(style);

    // Abre o diálogo de impressão
    window.print();

    // Remove o estilo temporário após impressão
    setTimeout(() => {
        document.head.removeChild(style);
    }, 1000);
}

async function loadResume() {
    try {
        const response = await fetch('resume.yaml');
        if (!response.ok) {
            console.error('Error loading resume.yaml');
            return;
        }

        const text = await response.text();
        const data = jsyaml.load(text);
        const resume = data.resume;

        /* Header do site */
        document.getElementById('site-name').textContent = resume.personal.name || '';
        document.getElementById('site-role').textContent = 'Software Engineer';

        /* Header do currículo */
        document.getElementById('resume-name').textContent = resume.personal.name || '';

        /* Contato */
        const contactInfo = document.getElementById('contact-info');
        const contactParts = [];
        if (resume.personal.email) contactParts.push(`<span>${resume.personal.email}</span>`);
        if (resume.personal.phone) contactParts.push(`<span>${resume.personal.phone}</span>`);
        if (resume.personal.location) contactParts.push(`<span>${resume.personal.location}</span>`);
        contactInfo.innerHTML = contactParts.join('');

        /* Links sociais */
        const socialLinks = document.getElementById('social-links');
        const links = [];
        if (resume.personal.links && resume.personal.links.linkedin) {
            links.push(`<a href="${resume.personal.links.linkedin}" target="_blank">LinkedIn</a>`);
        }
        if (resume.personal.links && resume.personal.links.github) {
            links.push(`<a href="${resume.personal.links.github}" target="_blank">GitHub</a>`);
        }
        socialLinks.innerHTML = links.join(' • ');

        /* Footer socials */
        if (resume.personal.links && resume.personal.links.linkedin) {
            document.getElementById('footer-linkedin').href = resume.personal.links.linkedin;
        }
        if (resume.personal.links && resume.personal.links.github) {
            document.getElementById('footer-github').href = resume.personal.links.github;
        }

        /* Professional summary */
        document.getElementById('professional-summary').innerHTML =
            `<p>${resume.professional_summary || ''}</p>`;

        /* Skills – estilo linha única com suporte para todas as categorias */
        const skillsGrid = document.getElementById('skills-grid');
        const skillsData = resume.skills || {};

        // Mapeamento de chaves para títulos formatados
        const categoryTitles = {
            'ai_and_databases': 'AI & Databases',
            'cloud_and_devops': 'Cloud & DevOps',
            'languages_and_frameworks': 'Languages & Frameworks',
            'Testing and practices': 'Testing and Practices',
            'soft_skills': 'Soft Skills'
        };

        skillsGrid.innerHTML = Object.keys(skillsData).map(key => {
            const skills = skillsData[key] || [];
            const title = categoryTitles[key] || key.split('_').map(word => 
                word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' ');

            return `
                <div class="skill-category">
                    <span class="skill-category-title">${title}:</span>
                    <span class="skill-category-items"> ${skills.join(', ')}</span>
                </div>
            `;
        }).join('');

        /* Professional experience */
        const expList = document.getElementById('experience-list');
        expList.innerHTML = (resume.professional_experience || []).map(exp => {
            const responsibilities = (exp.responsibilities || [])
                .map(r => `<li>${r}</li>`).join('');
            const stack = exp.stack
                ? `<div class="stack-info">Stack: ${exp.stack.join(', ')}</div>`
                : '';

            return `
                <div class="experience-item">
                    <div class="experience-header">
                        <h4>${exp.role || ''} - ${exp.company || ''}</h4>
                        <span class="period">${exp.period || ''}</span>
                    </div>
                    <div class="company-location">${exp.location || ''}</div>
                    <ul>${responsibilities}</ul>
                    ${stack}
                </div>
            `;
        }).join('');

        /* Languages */
        const languagesSection = document.getElementById('languages-section');
        const langs = [];
        if (resume.languages && resume.languages.portuguese) {
            langs.push(`<span><strong>Portuguese:</strong> ${resume.languages.portuguese}</span>`);
        }
        if (resume.languages && resume.languages.english) {
            langs.push(`<span><strong>English:</strong> ${resume.languages.english}</span>`);
        }
        languagesSection.innerHTML = langs.join(' | ');

    } catch (err) {
        console.error('Error processing resume.yaml', err);
    }
}

loadResume();

