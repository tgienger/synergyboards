'use strict';

angular.module('synergy.composer', [])
    .controller('SynergyComposerCtrl', ['$scope', function( $scope ) {
        var scope = $scope.$new();

        this.composer = function(el) {

            /**
             * is text already modded?
             * @type {Boolean}
             */
            var modded = false,
                currentMod,
                tabStopSet = false,
                mod,

                /**
                 * Holds the selected TEXT
                 * @type {Object}
                 */
                selected,
                // is it a url modifier?
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



            /**
             * Tests string for markdown modifications
             */
            var test = function() {
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
            };



            /**
             * gets the selected text within the textarea element
             */
            var getSelection = function() {
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
            };



            /**
             * removes markdown modification
             */
            var unMod = function(cb) {
                var newText = selected.text;
                var oldText = currentMod;
                var modFront = selected.start - oldText.indexOf(newText);
                var modBack = modFront + oldText.length;
                el.value = el.value.slice(0, modFront) + selected.text + el.value.slice(modBack);
                modded = false;
                (cb || angular.noop)();
            };


            function setText(txt) {
                el.value = txt;
                modded = true;
            }



            /**
             * adds markdown modification
             */
            var addMod = function(cb, cb2) {

                var http,
                    position = 0,
                    reg = new RegExp(selected.text, 'g');

                if (url) {
                    alertify.prompt('Enter URL', function(e,s){
                        if (e) {
                            if (s.startsWith('http://') || s.startsWith('https://')) {
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
                            (cb2 || angular.noop)();
                            (cb || angular.noop)();
                        } else {

                        }
                        url = false;
                    }, 'http://');
                } else {
                    mod = mod.replace(reg, selected.text);
                    setText(el.value.slice(0, selected.start) + mod + el.value.slice(selected.end));
                    (cb2 || angular.noop)();
                    (cb || angular.noop)();
                }

            };



            var tabStop = function() {

                var loc,
                    arr,
                    index,
                    length,
                    newloc,
                    isSet = false,
                    regex;


                function setEnding(ending) {
                    loc = ending;

                    arr = loc.split('');
                    index = -1;
                    length = arr.length;

                    while (++index < length) {
                        if (arr[index].search(/\*|\]|\(|\)|\//g) > -1) {
                            arr[index] = '\\' + arr[index];
                        }
                    }

                    newloc = arr.join('');
                    regex = new RegExp(newloc);
                }

                function currentPos() {
                    return getSelection().end;
                }

                function findEnd() {
                    var start = currentPos();
                    var searchText = el.value.slice(start);
                    return searchText.search(regex) + loc.length;
                }
                // console.log(currentPos());
                // console.log(str.search(regex) + loc.length);
                return {
                    findEnd: findEnd,
                    currentPos: currentPos,
                    setEnding: setEnding,
                    isSet: isSet,
                };
            };
            var tabstop = tabStop();


            /**
             * If no text is selected, send in the default text 'placeholder text'
             */
            var noSelect = function(cb) {
                selected.text = 'placeholder text';
                mod = mod.replace(/SAMPLE/g, selected.text);
                addMod(cb);
            };



            /**
             * Once modification is complete, re-select text
             * between the markdown modifiers
             */
            var selectIt = function() {
                var index = 1,
                    text,
                    modIndex,
                    modLength;
                text = selected.text;
                modIndex = mod.indexOf(text);
                modLength = mod.slice(0, modIndex).length;
                var modEnd = mod.slice(modIndex + text.length, mod.length);
                if (modded) {
                    index = selected.start + modLength;
                } else {
                    index = selected.start - modLength;
                }
                el.focus();
                // el.selectionStart = index;
                // el.selectionEnd = selected.text.length + index;
                var ending = selected.text.length + index;
                setSelectionRange(el, index, ending);

                if (modded) {
                    tabstop.isSet = true;
                    tabstop.setEnding(modEnd);
                } else {
                    tabstop.isSet = true;
                }
            };



            // close the composer - keeping the content intact.
            // with optional callback.
            var close = function(cb) {
                scope.composerController.collapse = true;
                (cb || angular.noop)();
            };



            // Opens the composer with optional callback
            var open = function(cb) {
                scope.composerController.collapse = false;
                (cb || angular.noop)();
            };



            /**
             * Send external text into the composer (ea. quoting someone elses post)
             * @param {string}   str The string sent to the composer
             * @param {Function} cb  Optional callback
             */
            var addExternal = function(str, cb) {
                selected = {
                    start: el.value.length,
                    end: el.value.length,
                    text: str
                };
                if (el.value.length > 0) {
                    selected.text = '\n\n' + selected.text;
                }
                setText(el.value.slice(0, selected.start) + selected.text + el.value.slice(selected.end));
                (cb || angular.noop)();
            };



            /**
             * Starts the markdown process
             */
            var create = function(m, cb) {

                mod = m;
                selected = getSelection();

                 if (mod === mods[2]) {
                     url = true;
                 } else {
                     url = false;
                 }

                if (selected.text) {
                    if (test()) {
                        if (url) {

                        } else {
                            unMod(cb);
                            selectIt();
                        }
                    } else {
                        addMod(cb, selectIt);
                    }
                } else {
                    noSelect(cb);
                    selectIt();
                }
            };



            // Set the markdown
            var setMarkdown = function(md) {
                scope.composerController.markdown = md;
            };



            /**
             * Sets the selection within the textarea, set starting and ending point
             * to same location for caret placement.
             * @param {Object} input          Your text input/textarea
             * @param {number} selectionStart starting point of your selection
             * @param {number} selectionEnd   ending point of your selection
             */
            var setSelectionRange = function(input, selectionStart, selectionEnd) {
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
            };



            /**
             * Creates a new line below current and
             * moves caret to the beginning of the new line.
             * @param {Object} el Text element
             */
            var advanceToNewLine = function(cb) {

                var currentPosition = el.selectionStart,
                    lines = el.value.substr(0).split('\n'),
                    lineNumber = el.value.substr(0, el.selectionStart).split('\n').length - 1,
                    currentTotalLength = 0,
                    index = -1,
                    length = lines.length;

                // Count the number of characters from the start to the end of the
                // line where the caret currently resides.
                while (++index < length) {
                    currentTotalLength += lines[index].length > 0 ? lines[index].length + 1 : 1;
                    if (index === lineNumber) {
                        break;
                    }
                }

                // Current position of the caret
                currentPosition += (currentTotalLength - currentPosition);
                lines[lineNumber] = lines[lineNumber] + '\n';

                // reset the value of the textarea to include the newly added
                // blank line.
                el.value = lines.join('\n');
                // sets the cursor to the beginning of the newly created empty line.
                setSelectionRange(el, currentPosition, currentPosition);
                (cb || angular.noop)();
            };



            /**
             * Create a new line abover current line
             * and move caret to beginning of new line.
             * @param {Object} el Text element
             */
            var previousLine = function(cb) {
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
                (cb || angular.noop)();
            };



            return Object.freeze({
                create: create,
                close: close,
                open: open,
                advanceToNewLine: advanceToNewLine,
                previousLine: previousLine,
                setMarkdown: setMarkdown,
                addExternal: addExternal,
                getSelection: getSelection,
                setSelectionRange: setSelectionRange,
                tabstop: tabstop,
            });
        };

    }])
    .directive('synergyComposer', function () {
        return {
            // Public
            templateUrl: 'app/createPost/createPost.html',
            restrict: 'EA',
            controller: 'SynergyComposerCtrl',
            transclude: true,
            scope: {synergyController: '=', synergySubmit: '='},
            link: function(scope, element, attrs, createPostCtrl) {

                var el = document.getElementById('synergy-composer');

                var composer = createPostCtrl.composer(el);


                var mods = {
                    bold: '**SAMPLE**',
                    italic: '*SAMPLE*',
                    link: '[SAMPLE](SAMPLE)',
                    code: '```\nSAMPLE\n```',
                    quote: '>SAMPLE',
                    ul: '- SAMPLE',
                    ol: '1. SAMPLE'
                };



                // Exposing a few functions to $scope. Not sure if there's a
                // better way to do it.
                scope.synergyController = scope.composerController = {
                    markdown: '',
                    collapse: true,

                    open: function() {
                      composer.open();
                    },

                    close: function() {
                      composer.close();
                    },

                    submit: function(msg, type) {
                        this.topic = msg.grandParent || msg.parent;
                        switch (type) {
                            case 'quote':
                                this.subject = 'RE: ' + msg.subject;
                                composer.open(composer.addExternal('[blockquote=' + msg.username + ']' + msg.message + '[/blockquote]\n\n', function() {
                                    apply();
                                }));
                                break;
                            case 'reply':
                                this.subject = 'RE: ' + msg.subject;
                                composer.open(composer.addExternal('<a href="">@' + msg.username + '</a>\n\n', function() {
                                    apply();
                                }));
                                break;
                            default:
                                this.subject = msg.subject;
                                composer.open();
                        }
                    },

                    submitName: 'Post',
                    subject: '',
                    topic: '',
                };



                var apply = function() {
                    scope.$evalAsync(composer.setMarkdown(el.value));
                };

                /**
                 *  Textarea event handling
                 */
                angular.element(document).delegate('#synergy-composer', 'keydown', function (e) {
                    var keyCode = e.keyCode || e.which,
                        ctrlKey = e.ctrlKey,
                        metaKey = e.metaKey,
                        shiftKey = e.shiftKey,
                        caret;
                    // console.log(keyCode);
                    // Tab key handler, allowing indent rather than moving outside
                    // of the text area.
                    if (keyCode === 9) {
                        e.preventDefault();
                        caret = composer.getSelection();


                        // If a tabstop is set (after inserting markdown)
                        // then tab will send the caret to the end of the newly
                        // added markdown w/o adding a \t (tab spacing).
                        var ts = composer.tabstop;
                        if (ts.isSet) {
                            var start = ts.currentPos();
                            var end = ts.findEnd() + start;
                            composer.setSelectionRange(el, end, end);
                            ts.isSet = false;
                            return;
                        }

                        // set textarea value to: text before caret + tab +
                        // selected text (if any) + text after caret
                        el.value = el.value.substring(0, caret.start) + '\t' + caret.text +
                            el.value.substring(caret.end);

                        // put caret at right position again
                        // keeping text selected if any.
                        composer.setSelectionRange(el, caret.start + 1, caret.start + caret.text.length + 1);
                        return;
                    }

                    // BOLD
                    // Make Selected text bold with
                    // ctrl+b or cmd + b
                    if (keyCode === 66 && (ctrlKey  || metaKey)) {
                        e.preventDefault();
                        composer.create(mods.bold, function() {
                            apply();
                        });
                        return;
                    }

                    // ITALIC
                    // make selected text italic
                    // with ctrl+i or cmd + i
                    if (keyCode === 73 && (ctrlKey || metaKey)) {
                        e.preventDefault();
                        composer.create(mods.italic, function() {
                            apply();
                        });
                        return;
                    }

                    // (CMD or CTRL) + Shift + ENTER
                    // Advance current line, move cursor to previous, empty line.
                    if (keyCode === 13 && (ctrlKey || metaKey) && shiftKey) {
                        e.preventDefault();
                        composer.previousLine(function() {
                            apply();
                        });
                        return;
                    }


                    // (CMD or CTRL) + ENTER
                    // Advance to new line on Ctrl or CMD + Enter
                    if (keyCode === 13 && (ctrlKey || metaKey)) {
                        e.preventDefault();
                        composer.advanceToNewLine(function() {
                            apply();
                        });
                        return;
                    }


                    // ESC to close composer
                    if (keyCode === 27) {
                        // close the composer
                        composer.close(function() {
                            apply();
                        });
                        return;
                    }

                    // (CTRL || CMD) + Shift + L
                    if (keyCode === 76 && shiftKey && (ctrlKey || metaKey)) {
                        e.preventDefault();
                        composer.create(mods.link, function() {
                            apply();
                        });
                        return;
                    }

                });



                /**
                 * Handles toolbar selection. Gets id of clicked toolbar icon,
                 * selected text if any, and replaces it or places new text
                 * where caret is located.
                 * @param {event} event click event
                 */
                function toolbarHandler(event) {

                    switch (event.target.id) {
                    case 'toolbar-bold':
                        composer.create(mods.bold, function() {
                            apply();
                        });
                        return;
                    case 'toolbar-italic':
                        composer.create(mods.italic, function() {
                            apply();
                        });
                        return;
                    case 'toolbar-code':
                        composer.create(mods.code, function() {
                            apply();
                        });
                        break;
                    case 'toolbar-link':
                        // added a callback to allow scope.$apply() to be
                        // executed after the user inputs the URL.
                        composer.create(mods.link, function() {
                            apply();
                        });
                        break;
                    case 'toolbar-quote':
                        composer.create(mods.quote, function() {
                            apply();
                        });
                        break;
                    case 'toolbar-ul':
                        composer.create(mods.ul, function() {
                            apply();
                        });
                        break;
                    case 'toolbar-ol':
                        composer.create(mods.ol, function() {
                            apply();
                        });
                        break;
                    }

                }



                // Added click event handlers to each part of the toolbar.
                angular.element('#toolbar-bold').on('click', toolbarHandler);
                angular.element('#toolbar-italic').on('click', toolbarHandler);
                angular.element('#toolbar-code').on('click', toolbarHandler);
                angular.element('#toolbar-link').on('click', toolbarHandler);
                angular.element('#toolbar-quote').on('click', toolbarHandler);
                angular.element('#toolbar-ul').on('click', toolbarHandler);
                angular.element('#toolbar-ol').on('click', toolbarHandler);



                scope.$watch('composerController.collapse', function(val) {
                    if (val === false) {
                        angular.element('#synergy-composer').focus();
                    }
                });



                scope.closeComposer = function(exit) {
                    if (exit) {
                        composer.setMarkdown('');
                    }
                    composer.close();
                };

            },
        };
    });
