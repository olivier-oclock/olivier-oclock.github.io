const app = {
    board: 'simple',
    boards: {
        simple: {
            name: "Simples"
        },
        classes: {
            name: "Avec classes"
        },
    },

    init: function () {
        app.loadBoard();
        app.setBoardsList();
        document.querySelector('.style-builder__apply').addEventListener('click', app.applySelector); 
        document.querySelector('.style-builder__selector').addEventListener('input', app.updateDisplayCSS); 
        document.querySelector('.style-builder__style').addEventListener('input', app.updateDisplayCSS); 
        document.querySelector('.style-builder__style').addEventListener('input', app.updateDisplayCSS); 
    },

    loadBoard: function () {
        const container = document.querySelector('.tags');
        container.textContent = '';
        const template = document.querySelector(`.template--${app.board}`);
        const clone = document.importNode(template.content, true);
        container.append(clone);
    },

    selectBoard: function (name) {
        app.board = name;
        this.loadBoard();
        this.setBoardsList();
    },

    setBoardsList: function() {

        const list = document.querySelector('.style-builder__boards');
        list.textContent = '';
        for (const key in app.boards) {
            if (Object.hasOwnProperty.call(app.boards, key)) {
                const element = app.boards[key];
                const option = document.createElement('button');
                option.setAttribute('data-board', key);
                option.classList.add('style-builder__button');
                if (key === app.board) {
                    option.classList.add('style-builder__button--selected');
                }
                option.textContent = element.name;
                option.addEventListener('click', 
                    e => app.selectBoard(e.currentTarget.dataset.board)); 
                list.append(option);
            }
        }

    },

    applySelector: function name() {
        app.loadBoard();
        app.resetError();
        
        try {
            app.checkSelector();

            const selectorElement = document.querySelector(`.style-builder__selector`);
            const styleElement = document.querySelector(`.style-builder__style`);
    
            const selector = selectorElement.value;
            const declarations = styleElement.value;
    
            document.querySelector(`.tags`).querySelectorAll(selector).forEach((tag) => {
                tag.setAttribute('style', declarations);
            });    
        } catch (error) {
            app.displayError(error);
        }
        
    },

    updateDisplayCSS: function () {
        document.querySelector(`.style-builder__css-selector`).textContent = 
            document.querySelector(`.style-builder__selector`).value;

        document.querySelector(`.style-builder__css-declarations`).textContent = 
            document.querySelector(`.style-builder__style`).value;
        
    },

    checkSelector: function () {
        const selector = document.querySelector(`.style-builder__selector`).value;
        if (selector.length === 0) {
            throw new Error("Le sélecteur ne doit pas être vide");
        }
        const results = document.querySelector(`.tags`).querySelectorAll(selector);
        if (results.length === 0) {
            throw new Error("Le sélecteur est invalide ou ne selectionne aucun élement");
        }
    },

    displayError: function(error) {
        const label = document.querySelector('.style-builder__label--error.style-builder__label--selector');
        label.textContent = error.message;
    },

    resetError: function(error) {
        const label = document.querySelector('.style-builder__label--error.style-builder__label--selector');
        label.textContent = '';
    }
}

document.addEventListener('DOMContentLoaded', app.init);