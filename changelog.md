# Changelog
>[!NOTE]
> Current Version: 0.2.0

## Table of Contents
[v0.2.0](#v020---fix-indentation-parser-nested-blocks-and-python-isolation) | [v0.1.0](#v010---initial-release)

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