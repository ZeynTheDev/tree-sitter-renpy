# tree-sitter-renpy
> [!NOTE]
> Current version: v0.4.0 | Extension Repository: [zeynthedev/zed-renpy-extension](https://github.com/ZeynTheDev/zed-renpy-extension) | [Full Changelog](changelog.md)

Grammar for Ren'Py Zed extension.

## Usage
This repository primarily serves as the parser engine. If you are looking for the Zed extension that utilizes this grammar, please visit:
[zed-renpy-extension](https://github.com/ZeynTheDev/zed-renpy-extension).

## Development
To test the grammar locally:
```bash
npm install
tree-sitter generate
tree-sitter parse test.rpy
```
You can use the comprehensive code below as the test.rpy file content to test the v0.4.0 syntax coverage:
```
# Language Basics & Dialogue
define e = Character("Eileen", color="#c8ffc8")
default inventory["apple"] = 3

label start(start_points="default"):
    window show dissolve
    
    e @ happy -sad "I can use image attributes in my dialogue!"
    "Bam!" with vpunch
    
    window auto True

# Displaying Images
image eileen happy = Movie(play="eileen_movie.webm", side_mask=True)

label image_test:
    scene bg market night with fade
    show eileen happy -blushing at center, bounce behind bg_alias onlayer front
    hide eileen happy with dissolve

# Menus & Conditionals
menu airport_menu (screen="airport_ui"):
    set visited_places
    "Where should we go next?"
    
    "Kyoto" if points >= 10:
        if points > 50:
            "You are rich!"
        jump kyoto_label

# Audio & Voice
label audio_test:
    play music ["track1.ogg", "track2.ogg"] fadein 2.5 loop if_changed
    queue sound "<silence 10>" volume 1.0
    
    voice "v001.ogg"
    e "Listen to my beautiful voice."
    voice sustain
    e "And it seamlessly continues!"

```
The parsed Syntax Tree result should process completely without any ERROR nodes.
## Changelog of Current version
*This massive update completes the core syntax coverage corresponding to Chapter 1 ("The Ren'Py Language") of the official documentation. Read further official documentation [here](https://www.renpy.org/doc/html/).*

### Added
- **Full Conditional Statements:** Added rules for `if`, `elif`, `else`, `while`, and `pass` statements.
- **Advanced Display & Camera:** Added `image`, `camera`, and `show layer` statements. Expanded `show`, `scene`, and `hide` with comprehensive property clauses (`as`, `at`, `behind`, `onlayer`, `zorder`, `with`).
- **Dialogue Enhancements:** Supported `window` statement, inline image attributes (`e @ happy -sad`), and `rpy` statements.
- **Advanced Menus:** Supported `set` clauses, menu arguments, and conditional menu choices (`if`).
- **Expanded Audio & Voice:** Upgraded `play`, `stop`, and `queue` to support variable lists (`["a.ogg"]`) and full clauses (`fadein`, `fadeout`, `volume`, `loop`, `if_changed`). Added `voice` and `voice sustain` statements.

### Changed
- **Variable Definitions:** `define` and `default` now support array indexing (e.g., `inventory["apple"]`) via the new `variable_name` rule.
- **Init Refinements:** `init` statements now correctly differentiate between standard Ren'Py blocks and pure Python blocks (`init python:`), and support negative priorities (`init -5`).
- **Architecture:** `grammar.js` has been completely restructured and heavily commented into numbered Chapters and Sections corresponding to the official Ren'Py documentation for superior maintainability.

### Known Issues
- GUI, layout blocks, and complex transformations are not yet parsed (`screen`, `style`, `transform`, ATL blocks).
- Full syntax support will continue in incremental phases targeting Customizing the GUI and Screens.
- **Testing Scope:** Testing has primarily been conducted using synthetic/generated `.rpy` files. We highly encourage testing this grammar against real-world Ren'Py projects! Feedback, bug reports, and suggestions from actual development scenarios are greatly appreciated.

> [!NOTE]
> Please be wary before using this project since this project is heavily AI influenced—the repository owner is still learning on C and tree-sitter topic.