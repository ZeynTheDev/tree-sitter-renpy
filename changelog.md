# Changelog
>[!NOTE]
> Current Version: 0.4.0

## Table of Contents
[v0.4.0](#v040---the-renpy-language-milestone) | [v0.3.0](#v030---the-minimalist-flow-update) | [v0.2.0](#v020---fix-indentation-parser-nested-blocks-and-python-isolation) | [v0.1.0](#v010---initial-release)

## v0.4.0 - The Ren'Py Language Milestone
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

---

## v0.3.0 - The Minimalist Flow Update

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

---

## v0.2.0 - Fix Indentation Parser, Nested Blocks, and Python Isolation
### Supported
- **Label statements** (`label`) with fully parsed nested blocks.
- **Say statements** (narrator and character dialogue).
- **Jump and call statements**.
- **Scene, show, hide statements**, including support for multi-word image names (`show eileen happy`) and transform properties (`at right`).
- **Python statements** (`$`, `python:`, `init python:`) properly isolated as logical blocks (ready for editor language injection).
- **Menu blocks**, fully parsed including choices and deep nesting (e.g., menus inside menus).
- **Return and pause statements**.
- **Comments** (`#`), robustly handled as both inline and block comments.

### Fixed in v0.2.0
- Implemented a custom external scanner (`scanner.c`) to properly handle Ren'Py's indentation-based block structure.
- Menu blocks and Python blocks are no longer treated as opaque text. Their contents are now individually parsed and structurally navigable.
- Added support for multi-word identifiers in image names without requiring underscores.
- Resolved parsing errors caused by trailing inline comments and empty lines within indented blocks.

### Known Issues (Planned for v0.3.0)
- Missing support for variable declaration statements (`define`, `default`).
- Missing support for audio control statements (`play`, `stop`, `queue`).
- GUI and layout blocks are not yet parsed (`screen`, `style`, `transform`, `image`).
- Transition statements (`with`) are not yet explicitly mapped.

---

## v0.1.0 - Initial Release
### Supported
- Label statements (`label`)
- Say statements (narrator and character dialogue)
- Jump and call statements
- Scene, show, hide statements (single identifier image names)
- Inline Python (`$`)
- Menu blocks (single level, choices without nested statement parsing)
- Python blocks (`python:`, `init python:`)
- Return and pause statements
- Comments (`#`)

### Known Issues
- Multi-word image names (`show eileen happy`) are not supported yet.
  Use underscored names (`show eileen_happy`) as a workaround.
- Block contents inside `menu`, `python:`, and `init` are treated as
  opaque text rather than parsed statements. This means nested
  statements won't be individually highlighted or navigable.
- Indentation-based block structure is not fully parsed. This requires
  an external scanner (planned for v0.2.0).

### Planned for v0.2.0
- External scanner for proper indent/dedent handling
- Multi-word image names support
- Proper nested block parsing
