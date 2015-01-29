'use strict';

angular.module('synergyApp')
    .directive('createPost', function () {

        function textConstructor(mod, el) {
            /**
             * is text already modded?
             * @type {Boolean}
             */
            var modded = false,
                currentMod,
                /**
                 * Holds the selected TEXT
                 * @type {Object}
                 */
                selected,
                url = false,

                /**
                 * Holds examples of each markdown modifier
                 * @type {Array}
                 */
                mods = [
                '**SAMPLE**',
                '*SAMPLE*',
                '[SAMPLE](SAMPLE)',
                '```\nSAMPLE\n```',
                '>SAMPLE',
                '- SAMPLE',
                '1. SAMPLE'
            ];

            if (mod === mods[2]) {
                url = true;
            }

            /**
             * Tests string for markdown modifications
             */
            function test() {
                if (selected.text) {
                    var pattern = new RegExp('SAMPLE', 'g');
                    var testArray = [];
                    var index = -1;
                    var foundMod;

                    // replaces new array's 'SAMPLE' with the currently
                    // selected text for testing.
                    mods.forEach(function(d) {
                        testArray.push(d.replace(pattern, selected.text));
                    });
                    var length = testArray.length;

                    // Searches for a matching markdown, if found sets
                    // currentMod variable to the discovered md.
                    while (++index < length) {
                        var mIndex = testArray[index].indexOf(selected.text);
                        var modStart = testArray[index].slice(0, mIndex);
                        var doesStart = el.value.slice(0, selected.start).endsWith(modStart);
                        if (doesStart) {
                            foundMod = testArray[index];
                            break;
                        }
                    }

                    mod = mod.replace(/SAMPLE/g, selected.text);

                    if (foundMod && foundMod === mod) {
                        modded = true;
                        currentMod = foundMod;
                    } else {
                        modded = false;
                        currentMod = undefined;
                    }
                } else {
                        modded = false;
                        currentMod = undefined;
                        return false;
                }

                return modded;
            }

            /**
             * gets the selected text within the textarea element
             */
            function getSelection() {
                var textComponent = el,
                    selectedText,
                    sel,
                    startPos,
                    endPos;

                function setSelected(start, end, text) {
                    return {
                        start: start,
                        end: end,
                        text: text
                    };
                }
                // IE version
                if (document.selection !== undefined) {
                    textComponent.focus();
                    sel = document.selection.createRange();
                    selectedText = sel.text;
                } else if (textComponent.selectionStart !== undefined) {
                    startPos = textComponent.selectionStart;
                    endPos = textComponent.selectionEnd;
                    selectedText = textComponent.value.substring(startPos, endPos);
                }
                return setSelected(startPos, endPos, selectedText);
            }

            /**
             * removes markdown modification
             */
            function unMod() {
                var newText = selected.text;
                var oldText = currentMod;
                var modFront = selected.start - oldText.indexOf(newText);
                var modBack = modFront + oldText.length;
                el.value = el.value.slice(0, modFront) + selected.text + el.value.slice(modBack);
                modded = false;
            }

            /**
             * adds markdown modification
             */
            function addMod(cb) {
                function setText(txt) {
                    el.value = txt;
                    modded = true;
                }
                var http,
                    position = 0,
                    reg = new RegExp(selected.text, 'g');

                if (url) {
                    alertify.prompt('Enter URL', function(e,s){
                        if (e) {
                            if (s.startsWith('http://')) {
                                http = s;
                            } else {
                                http = 'http://' + s;
                            }
                            mod = mod.replace(reg, function(match) {
                                position++;
                                return (position === 2) ? http : match;
                            });
                            setText(el.value.slice(0, selected.start) + mod + el.value.slice(selected.end));
                            selectIt();
                            (cb || angular.noop)();
                        } else {

                        }
                    }, 'http://');
                } else {
                    mod = mod.replace(reg, selected.text);
                    setText(el.value.slice(0, selected.start) + mod + el.value.slice(selected.end));
                    selectIt();
                }

            }

            /**
             * If no text is selected, send in the default text 'TEXT HERE'
             */
            function noSelect(cb) {
                selected.text = 'placeholder';
                mod = mod.replace(/SAMPLE/g, selected.text);
                addMod(cb);
            }

            /**
             * Once modification is complete, re-select text
             * between the markdown modifiers
             */
            function selectIt() {
                var index = 1,
                    text,
                    modIndex,
                    modLength;
                text = selected.text;
                modIndex = mod.indexOf(text);
                modLength = mod.slice(0, modIndex).length;
                if (modded) {
                    index = selected.start + modLength;
                } else {
                    index = selected.start - modLength;
                }
                el.focus();
                // el.selectionStart = index;
                // el.selectionEnd = selected.text.length + index;
                setSelectionRange(el, index, selected.text.length + index);
            }

            /**
             * Starts the markdown process
             */
             function create(cb) {
                if (selected.text) {
                    if (test()) {
                        if (url) {

                        } else {
                            unMod();
                            selectIt();
                        }
                    } else {
                        addMod(cb);
                        // selectIt();
                    }
                } else {
                    noSelect(cb);
                    selectIt();
                }
            }

            selected = getSelection();

            return Object.freeze({
                create: create,
                getSelection: getSelection
            });
        }

        function setSelectionRange(input, selectionStart, selectionEnd) {
            if (input.setSelectionRange) {
                input.focus();
                input.setSelectionRange(selectionStart, selectionEnd);
            }
            else if (input.createTextRange) {
                var range = input.createTextRange();
                range.collapse(true);
                range.moveEnd('character', selectionEnd);
                range.moveStart('character', selectionStart);
                range.select();
            }
        }

        /**
         * Creates a new line below current and
         * moves caret to the beginning of the new line.
         * @param {Object} el Text element
         */
        function advanceToNewLine(el) {

            var currentPosition = el.selectionStart,
                lines = el.value.substr(0).split('\n'),
                lineNumber = el.value.substr(0, el.selectionStart).split('\n').length - 1,
                currentTotalLength = 0,
                index = -1,
                length = lines.length;

            while (++index < length) {
                currentTotalLength += lines[index].length > 0 ? lines[index].length + 1 : 1;
                if (index === lineNumber) {
                    break;
                }
            }

            currentPosition += (currentTotalLength - currentPosition);
            lines[lineNumber] = lines[lineNumber] + '\n';

            el.value = lines.join('\n');
            setSelectionRange(el, currentPosition, currentPosition);
        }

        /**
         * Create a new line abover current line
         * and move caret to beginning of new line.
         * @param {Object} el Text element
         */
        function previousLine(el) {
            var currentPosition = el.selectionStart,
                currentTotalLength = 0,
                lines = el.value.substr(0).split('\n'),
                lineNumber = el.value.substr(0, el.selectionStart).split('\n').length - 1,
                index = -1,
                length = lines.length;
            while (++index < length) {
                currentTotalLength += lines[index].length > 0 ? lines[index].length + 1 : 1;
                if (index === lineNumber) {
                    break;
                }
            }
            currentPosition -= (lines[lineNumber].length + 1) - (currentTotalLength - currentPosition);
            lines[lineNumber] = '\n' + lines[lineNumber];
            el.value = lines.join('\n');
            setSelectionRange(el, currentPosition, currentPosition);
        }

        return {
            // Public
            templateUrl: 'app/createPost/createPost.html',
            restrict: 'EA',
            link: function (scope) {
                var mods = {
                    bold: '**SAMPLE**',
                    italic: '*SAMPLE*',
                    link: '[SAMPLE](SAMPLE)',
                    code: '```\nSAMPLE\n```',
                    quote: '>SAMPLE',
                    ul: '- SAMPLE',
                    ol: '1. SAMPLE'
                };
                var el = document.getElementById('text-input');

                function apply(el) {
                    scope.composer.markdown = el.value;
                    scope.$apply();
                }

                scope.$watch('composer.collapse', function(val) {
                    if (val === false) {
                        angular.element('#text-input').focus();
                    }
                });

                angular.element(document).delegate('#text-input', 'keydown', function (e) {
                    var keyCode = e.keyCode || e.which,
                        ctrlKey = e.ctrlKey,
                        metaKey = e.metaKey,
                        $this = angular.element(this),
                        start,
                        end;

                    if (keyCode === 9) {
                        e.preventDefault();
                        start = el.selectionStart;
                        end = el.selectionEnd;

                        // set textarea value to: text before caret + tab + text after caret
                        $this.val($this.val().substring(0, start) +
                            '\t' +
                            $this.val().substring(end));

                        // put caret at right position again
                        el.selectionStart =
                            el.selectionEnd = start + 1;
                        return;
                    }

                    // BOLD
                    // Make Selected text bold with
                    // ctrl+b or cmd + b
                    if (keyCode === 66 && (ctrlKey  || metaKey)) {
                        e.preventDefault();
                        textConstructor(mods.bold, el).create();
                        apply(el);
                        return;
                    }

                    // ITALIC
                    // make selected text italic
                    // with ctrl+i or cmd + i
                    if (keyCode === 73 && (ctrlKey || e.metaKey)) {
                        e.preventDefault();
                        textConstructor(mods.italic, el).create();
                        apply(el);
                        return;
                    }

                    // (CMD or CTRL) + Shift + ENTER
                    // Advance current line, move cursor to previous, empty line.
                    if (keyCode === 13 && (e.ctrlkey || e.metaKey) && e.shiftKey) {
                        e.preventDefault();
                        previousLine(el);
                        apply(el);
                        return;
                    }


                    // (CMD or CTRL) + ENTER
                    // Advance to new line on Ctrl or CMD + Enter
                    if (keyCode === 13 && (ctrlKey || e.metaKey)) {
                        e.preventDefault();
                        advanceToNewLine(el);
                        apply(el);
                        return;
                    }

                });

                /**
                 * Handles toolbar selection. Gets id of clicked toolbar icon, selected
                 * text if any, and replaces it or places new text where caret is
                 * located.
                 * @param {event} event click event
                 */
                function toolbarHandler(event) {

                    switch (event.target.id) {
                    case 'toolbar-bold':
                        textConstructor(mods.bold, el).create();
                        apply(el);
                        return;
                    case 'toolbar-italic':
                        textConstructor(mods.italic, el).create();
                        apply(el);
                        return;
                    case 'toolbar-code':
                        textConstructor(mods.code, el).create();
                        apply(el);
                        break;
                    case 'toolbar-link':
                        textConstructor(mods.link, el).create(function() {
                            apply(el);
                        });
                        // apply(el);
                        break;
                    case 'toolbar-quote':
                        textConstructor(mods.quote, el).create();
                        apply(el);
                        break;
                    case 'toolbar-ul':
                        textConstructor(mods.ul, el).create();
                        apply(el);
                        break;
                    case 'toolbar-ol':
                        textConstructor(mods.ol, el).create();
                        apply(el);
                        break;
                    }

                }

                angular.element('#toolbar-bold').on('click', toolbarHandler);
                angular.element('#toolbar-italic').on('click', toolbarHandler);
                angular.element('#toolbar-code').on('click', toolbarHandler);
                angular.element('#toolbar-link').on('click', toolbarHandler);
                angular.element('#toolbar-quote').on('click', toolbarHandler);
                angular.element('#toolbar-ul').on('click', toolbarHandler);
                angular.element('#toolbar-ol').on('click', toolbarHandler);

            }
        };
    });
