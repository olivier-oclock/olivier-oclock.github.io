const app = {
    styles: {
        margin: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        },
        padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        },
        border: {
            style: 'solid',
            width: 0,
            color: '#000000'
        },
        width: 'auto',
        height: 'auto',
    },
    directions: ['top', 'right', 'bottom', 'left'],

    init: function () {
        document.querySelectorAll(`.watch`).forEach((element) => {
            element.addEventListener('input', app.updateStyles); 
        });
        app.displayCss();
    },

    updateStyles: function () {

        app.directions.forEach((direction) => {
            app.styles.margin[direction] = document.querySelector(`.style-builder__margin-${direction}`).value;
            app.styles.padding[direction] = document.querySelector(`.style-builder__padding-${direction}`).value;
        });
        app.styles.border.color = document.querySelector(`.style-builder__border-color`).value;
        app.styles.border.width = document.querySelector(`.style-builder__border-width`).value;
        app.styles.border.style = document.querySelector(`.style-builder__border-style`).value;

        app.styles.width = document.querySelector(`.style-builder__width`).value;
        app.styles.height = document.querySelector(`.style-builder__height`).value;

        app.applyStyles();
        app.displayCss();
    },

    applyStyles: function () {
        const block = document.querySelector('.block');

        app.directions.forEach((direction) => {
            block.style[`margin${app.capitalize(direction)}`] = `${app.styles.margin[direction]}px`;
            block.style[`padding${app.capitalize(direction)}`] = `${app.styles.padding[direction]}px`;
        });
        block.style.borderStyle = app.styles.border.style;
        block.style.borderColor = app.styles.border.color;
        block.style.borderWidth = `${app.styles.border.width}px`;

        block.style.width = app.styles.width;
        block.style.height = app.styles.height;
    },

    displayCss: function () {
        document.querySelector(`.style-builder__css-declarations`).textContent = 
`margin: ${app.styles.margin.top}px ${app.styles.margin.right}px ${app.styles.margin.bottom}px ${app.styles.margin.left}px;
padding: ${app.styles.padding.top}px ${app.styles.padding.right}px ${app.styles.padding.bottom}px ${app.styles.padding.left}px;
border: ${app.styles.border.width}px ${app.styles.border.style} ${app.styles.border.color};
width: ${app.styles.width};
height: ${app.styles.height};
`;
    },

    capitalize: function (string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}

document.addEventListener('DOMContentLoaded', app.init);