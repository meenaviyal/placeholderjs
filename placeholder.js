// SVG Placeholder Library

const SVGPlaceholder = {
    // Initialize the library
    init: function() {
        this.replacePlaceholders();
    },

    // Find and replace all placeholder images
    replacePlaceholders: function() {
        const imgs = document.querySelectorAll('img[class^="placeholder-"]');
        imgs.forEach(img => {
            const [_, width, height] = img.className.match(/placeholder-(\d+)-(\d+)/);
            const svgString = this.generateSVG(parseInt(width), parseInt(height));
            img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgString);
            img.width = width;
            img.height = height;
        });
    },

    // Generate SVG content
    generateSVG: function(width, height) {
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("width", width);
        svg.setAttribute("height", height);
        svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");

        // Add background
        const background = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        background.setAttribute("width", "100%");
        background.setAttribute("height", "100%");
        background.setAttribute("fill", this.getRandomColor());
        svg.appendChild(background);

        // Add random elements
        const numElements = Math.floor(Math.random() * 5) + 3; // 3 to 7 elements
        for (let i = 0; i < numElements; i++) {
            const element = this.getRandomSVGElement(width, height);
            svg.appendChild(element);
        }

        // Add dimensions text
        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", "50%");
        text.setAttribute("y", "50%");
        text.setAttribute("font-family", "Arial, sans-serif");
        text.setAttribute("font-size", "16px");
        text.setAttribute("fill", "#ffffff");
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("dominant-baseline", "middle");
        text.textContent = `${width}x${height}`;
        svg.appendChild(text);

        return svg.outerHTML;
    },

    // Get a random SVG element (text, circle, or rectangle)
    getRandomSVGElement: function(width, height) {
        const types = ['text', 'circle', 'rect'];
        const type = types[Math.floor(Math.random() * types.length)];
        
        switch(type) {
            case 'text':
                return this.getRandomText(width, height);
            case 'circle':
                return this.getRandomCircle(width, height);
            case 'rect':
                return this.getRandomRect(width, height);
        }
    },

    // Generate a random text element (emoticon)
    getRandomText: function(width, height) {
        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", Math.random() * width);
        text.setAttribute("y", Math.random() * height);
        text.setAttribute("font-size", `${Math.floor(Math.random() * 20) + 10}px`);
        text.setAttribute("fill", this.getRandomColor());
        text.textContent = this.getRandomEmoticon();
        return text;
    },

    // Generate a random circle element
    getRandomCircle: function(width, height) {
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", Math.random() * width);
        circle.setAttribute("cy", Math.random() * height);
        circle.setAttribute("r", Math.random() * 20 + 5);
        circle.setAttribute("fill", this.getRandomColor());
        return circle;
    },

    // Generate a random rectangle element
    getRandomRect: function(width, height) {
        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("x", Math.random() * width);
        rect.setAttribute("y", Math.random() * height);
        rect.setAttribute("width", Math.random() * 40 + 10);
        rect.setAttribute("height", Math.random() * 40 + 10);
        rect.setAttribute("fill", this.getRandomColor());
        return rect;
    },

    // Generate a random color
    getRandomColor: function() {
        return '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    },

    // Get a random emoticon from Unicode ranges
    getRandomEmoticon: function() {
        const ranges = [
            [0x1F600, 0x1F64F], // Emoticons
            [0x1F300, 0x1F5FF], // Misc Symbols and Pictographs
            [0x1F680, 0x1F6FF], // Transport and Map Symbols
            [0x2600, 0x26FF],   // Misc symbols
            [0x2700, 0x27BF],   // Dingbats
            [0x1F900, 0x1F9FF]  // Supplemental Symbols and Pictographs
        ];
        
        const range = ranges[Math.floor(Math.random() * ranges.length)];
        const codePoint = Math.floor(Math.random() * (range[1] - range[0] + 1)) + range[0];
        return String.fromCodePoint(codePoint);
    }
};

// Initialize the library when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    SVGPlaceholder.init();
});