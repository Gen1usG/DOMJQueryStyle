window.JQuery = function (selectorORstringORarray) {
    let elements
    if (typeof selectorORstringORarray === 'string') {
        if (selectorORstringORarray[0] === '<') {
            elements = [createElements(selectorORstringORarray)]
        } else {
            elements = document.querySelectorAll(selectorORstringORarray)
        }
    } else if (selectorORstringORarray instanceof Array) {
        elements = selectorORstringORarray
    }


    function createElements(string) {
        let container = document.createElement('template')
        container.innerHTML = string.trim()
        return container.content.firstChild
    }

    const api = Object.create(JQuery.prototype)

    Object.assign(api, {
        jquery: true,
        elements: elements,
        oldApi: selectorORstringORarray.oldApi,
    })

    return api
}

JQuery.prototype = {
    constructor: JQuery,
    addClass(className) {
        for (let i = 0; i < this.elements.length; i++) {
            this.elements[i].classList.add(className)
        }
        return this
    },

    get(index) {
        return this.elements[index]
    },

    print() {
        console.log(this.elements);
    },

    find(selector) {
        let array = []
        this.each(node => {
            const elements2 = Array.from(node.querySelectorAll(selector))
            array = array.concat(elements2)
        })
        array.oldApi = this
        return JQuery(array)
    },

    parent() {
        const array = []
        this.each(node => {
            if (array.indexOf(node.parentNode) === -1) {
                array.push(node.parentNode)
            }
        })
        return JQuery(array)
    },

    children() {
        const array = []
        this.each(node => {
            array.push(...node.children)
        })
        return JQuery(array)
    },

    each(fn) {
        for (let i = 0; i < this.elements.length; i++) {
            fn(this.elements[i])
        }
        return this
    },

    appendTo(parent) {
        if (parent instanceof Element) {
            this.each(node => { parent.appendChild(node) })
        } else if (typeof parent === 'string') {
            let parentNode = JQuery(parent)
            this.each(node => { parentNode.get(0).appendChild(node) })
        } else if (parent.jquery === true) {
            this.each(node => { parent.get(0).appendChild(node) })
        }
        return this
    },

    append(child) {
        if (child instanceof Element) {
            this.get(0).appendChild(child)
        } else if (child instanceof HTMLCollection || child instanceof NodeList) {
            for (let i = 0; i < child.length; i++) {
                this.get(0).appendChild(child[i])
            }
        } else if (child.jquery === true) {
            child.each(node => { this.get(0).appendChild(node) })
        }
        return this
    },

    end() {
        return this.oldApi
    }
}

window.$ = window.JQuery