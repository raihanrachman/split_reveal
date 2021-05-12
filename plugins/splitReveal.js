
export default class splitReveal {
    constructor(containers, opts) {
        this.elements = [];
        this.containers = containers
        this.callback = opts.scroll

        this.genereateElements();
        this.addListeners()
    }

    addListeners() {
        this.callback.on('scroll', () => {
            this.animate()
        })
    }

    genereateElements() {
        let splitContainers = [...this.containers.querySelectorAll("[data-splitting]")];
        splitContainers.forEach(split => {
            let words = split.querySelectorAll(".word")
            let element = {
                container: split,
                revealedWords: 0,
                get top() {
                    return this.container.getBoundingClientRect().top
                },
                get height() {
                    return this.container.getBoundingClientRect().height
                },
                words,
                get totalWords() { return this.words.length },
                get revealProgress() {
                    Math.floor((window.innerHeight - this.top - 40 / this.height) * this.totalWords)
                },

            }

            this.elements.push(element)
        })

    }

    updateElement(el) {
        el.revealedWords = el.revealProgress
    }

    animate() {
        let direction;
        this.elements.forEach(el => {
            direction = el.revealedWords < el.revealProgress ? "DOWN" : "UP"
            switch (direction) {
                case "DOWN": {
                    console.log(el, "down")
                }
                    break;

                case "UP": {
                    console.log(el, "up")
                }

                    break;

                default:
                    break;
            }

            this.updateElement(el)
        })


    }


}