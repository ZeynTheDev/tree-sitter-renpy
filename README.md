# tree-sitter-renpy
> [!NOTE]
> Current version: v0.3.0 | Extension Repository: [zeynthedev/zed-renpy-extension](https://github.com/ZeynTheDev/zed-renpy-extension) | [Full Changelog](changelog.md)

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
You can use code below as the `test.rpy` file content:
```
# This is a top-level comment
init python:
    some_var = True

    # Comment on python block
    another_var = False

default loop_cycle = 1
define realm = "Lost Midgard"
define mc = Character("Zeyn")
define audio.sunflower = "my-music/sunflower.ogg"

label start:
    play music "rewind_theme.ogg" fadein 2.0 loop volume 0.5

    python:
        # A standalone python block
        player_hp = 100
        is_game_over = False

    "Hello world." # an inline comment
    play sound "combo_break.wav"
    e "Hello from eileen."

    stop music fadeout 1.0
    queue music "calm_bgm.ogg"
    scene bg_room night
    with fade
    show eileen happy
    with dissolve
    show eileen happy at right
    hide eileen happy
    with None
    $ some_variable = True # an inline comment on python line
    pause 1.0
    menu:
        "Option A":
            jump label_a
        "Option B":
            menu:
                "Nested Option":
                    jump label_b
    jump another_label
    call some_label
    return

```
The result should be shown as below (with no error, of course):
```
(source_file [0, 0] - [45, 0]
  (comment [0, 0] - [0, 29])
  (init_statement [1, 0] - [7, 0]
    (indented_block [2, 4] - [7, 0]
      (python_content [2, 4] - [2, 19])
      (python_content [4, 0] - [4, 29])
      (python_content [5, 0] - [5, 23])))
  (default_statement [7, 0] - [7, 22]
    name: (dotted_name [7, 8] - [7, 18]
      (identifier [7, 8] - [7, 18]))
    value: (python_content [7, 20] - [7, 22]))
  (define_statement [8, 0] - [8, 31]
    name: (dotted_name [8, 7] - [8, 12]
      (identifier [8, 7] - [8, 12]))
    value: (python_content [8, 14] - [8, 31]))
  (define_statement [9, 0] - [9, 29]
    name: (dotted_name [9, 7] - [9, 9]
      (identifier [9, 7] - [9, 9]))
    value: (python_content [9, 11] - [9, 29]))
  (define_statement [10, 0] - [10, 49]
    name: (dotted_name [10, 7] - [10, 22]
      (identifier [10, 7] - [10, 12])
      (identifier [10, 13] - [10, 22]))
    value: (python_content [10, 24] - [10, 49]))
  (label_statement [12, 0] - [44, 4]
    (identifier [12, 6] - [12, 11])
    (block [13, 4] - [44, 4]
      (play_statement [13, 4] - [13, 60]
        channel: (identifier [13, 9] - [13, 14])
        file: (string [13, 15] - [13, 33])
        (number [13, 41] - [13, 44])
        (number [13, 57] - [13, 60]))
      (python_block [15, 4] - [20, 4]
        (comment [16, 8] - [16, 35])
        (indented_block [16, 35] - [20, 4]
          (python_content [17, 8] - [17, 23])
          (python_content [18, 0] - [18, 28])))
      (say_statement [20, 4] - [21, 0]
        (string [20, 4] - [20, 18])
        (comment [20, 19] - [20, 38]))
      (play_statement [21, 4] - [21, 32]
        channel: (identifier [21, 9] - [21, 14])
        file: (string [21, 15] - [21, 32]))
      (say_statement [22, 4] - [23, 0]
        (identifier [22, 4] - [22, 5])
        (string [22, 6] - [22, 26]))
      (stop_statement [24, 4] - [24, 26]
        channel: (identifier [24, 9] - [24, 14])
        (number [24, 23] - [24, 26]))
      (queue_statement [25, 4] - [25, 30]
        channel: (identifier [25, 10] - [25, 15])
        file: (string [25, 16] - [25, 30]))
      (scene_statement [26, 4] - [27, 0]
        (image_name [26, 10] - [26, 23]
          (identifier [26, 10] - [26, 17])
          (identifier [26, 18] - [26, 23])))
      (with_statement [27, 4] - [27, 13]
        transition: (dotted_name [27, 9] - [27, 13]
          (identifier [27, 9] - [27, 13])))
      (show_statement [28, 4] - [29, 0]
        (image_name [28, 9] - [28, 21]
          (identifier [28, 9] - [28, 15])
          (identifier [28, 16] - [28, 21])))
      (with_statement [29, 4] - [29, 17]
        transition: (dotted_name [29, 9] - [29, 17]
          (identifier [29, 9] - [29, 17])))
      (show_statement [30, 4] - [31, 0]
        (image_name [30, 9] - [30, 21]
          (identifier [30, 9] - [30, 15])
          (identifier [30, 16] - [30, 21]))
        (transform_property [30, 25] - [30, 30]
          (identifier [30, 25] - [30, 30])))
      (hide_statement [31, 4] - [32, 0]
        (image_name [31, 9] - [31, 21]
          (identifier [31, 9] - [31, 15])
          (identifier [31, 16] - [31, 21])))
      (with_statement [32, 4] - [32, 13])
      (python_line [33, 4] - [34, 0]
        (python_content [33, 5] - [33, 61]))
      (pause_statement [34, 4] - [35, 0]
        (number [34, 10] - [34, 13]))
      (menu_statement [35, 4] - [43, 4]
        (menu_choice [36, 8] - [38, 8]
          (string [36, 8] - [36, 18])
          (block [37, 12] - [38, 8]
            (jump_statement [37, 12] - [38, 0]
              (identifier [37, 17] - [37, 24]))))
        (menu_choice [38, 8] - [43, 4]
          (string [38, 8] - [38, 18])
          (block [39, 12] - [43, 4]
            (menu_statement [39, 12] - [42, 4]
              (menu_choice [40, 16] - [42, 4]
                (string [40, 16] - [40, 31])
                (block [41, 20] - [42, 4]
                  (jump_statement [41, 20] - [42, 0]
                    (identifier [41, 25] - [41, 32])))))
            (jump_statement [42, 4] - [43, 0]
              (identifier [42, 9] - [42, 22])))))
      (call_statement [43, 4] - [44, 0]
        (identifier [43, 9] - [43, 19]))))
  (return_statement [44, 4] - [45, 0]))
```

## Changelog of Current version
### Added
- **Variable Declarations:** Added grammar rules for `define_statement` and `default_statement`.
- **Audio Controls:** Added parsing support for `play_statement`, `stop_statement`, and `queue_statement`.
- **Audio Modifiers:** Supported optional clauses in audio statements (`fadein`, `fadeout`, `volume`, `loop`, `noloop`).
- **Transitions:** Added rule for `with_statement` handling both custom transitions and `None`.
- **Namespace Support:** Introduced `dotted_name` rule to correctly parse dot-separated identifiers (e.g., `audio.track_name`).

### Fixed
- Resolved parsing errors when variables contained dots (namespaces) by replacing raw `identifier` calls with the new `dotted_name` rule in relevant statements.

### Known Issues
- GUI and layout blocks are not yet parsed (`screen`, `style`, `transform`, `image`).
- **Partial Syntax Coverage:** The grammar currently covers the core visual novel flow but does not yet cover the entirety of the [official Ren'Py documentation](https://www.renpy.org/doc/html/). Full syntax support will be implemented in incremental phases.

> [!NOTE]
> Please be wary before using this project since this project is heavily AI influenced—the repository owner is still learning on C and tree-sitter topic.