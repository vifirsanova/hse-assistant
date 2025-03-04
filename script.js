document.addEventListener("DOMContentLoaded", function () {
    fetch("content.json")
        .then(response => response.json())
        .then(data => {
            const contentContainer = document.getElementById("content");
            
            data.texts.forEach(item => {
                const p = document.createElement("p");
                p.innerHTML = item.text;
                
                item.highlights.forEach(highlight => {
                    const span = document.createElement("span");
                    span.innerText = highlight.word;
                    span.classList.add("highlight");
                    p.innerHTML = p.innerHTML.replace(highlight.word, span.outerHTML);
                });
                
                if (item.tooltip) {
                    const span = document.createElement("span");
                    span.innerText = item.tooltip.word;
                    span.classList.add("nlp-term");
                    span.setAttribute("tabindex", "0");
                    
                    const tooltip = document.createElement("span");
                    tooltip.classList.add("tooltip");
                    tooltip.innerText = item.tooltip.text;
                    
                    // Append the tooltip as a child of the span element
                    span.appendChild(tooltip);

                    // Replace word with the span containing the tooltip
                    p.innerHTML = p.innerHTML.replace(item.tooltip.word, span.outerHTML);
                }


                
                item.hypertext.forEach(hyper => {
                    const span = document.createElement("span");
                    span.innerText = hyper.word;
                    span.classList.add("hypertext");
                    
                    span.addEventListener("click", () => {
                        span.classList.toggle("active-hypertext");
                    });
                    
                    p.innerHTML = p.innerHTML.replace(hyper.word, span.outerHTML);
                });
                
                contentContainer.appendChild(p);
            });
        });
});
