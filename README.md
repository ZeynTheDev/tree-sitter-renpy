# tree-sitter-renpy
> [!NOTE]
> Current version: v0.2.0 | Extension Repository: [zeynthedev/zed-renpy-extension](https://github.com/ZeynTheDev/zed-renpy-extension) | [Full Changelog](changelog.md)

Grammar for Ren'Py Zed extension.

# Changelog of Current version
### Supported
- **Label statements** (`label`) with fully parsed nested blocks.
- **Say statements** (narrator and character dialogue).
- **Jump and call statements**.
- **Scene, show, hide statements**, including support for multi-word image names (`show eileen happy`) and transform properties (`at right`).
- **Python statements** (`$`, `python:`, `init python:`) properly isolated as logical blocks (ready for editor language injection).
- **Menu blocks**, fully parsed including choices and deep nesting (e.g., menus inside menus).
- **Return and pause statements**.
- **Comments** (`#`), robustly handled as both inline and block comments.

### Fixed in Current Version
- Implemented a custom external scanner (`scanner.c`) to properly handle Ren'Py's indentation-based block structure.
- Menu blocks and Python blocks are no longer treated as opaque text. Their contents are now individually parsed and structurally navigable.
- Added support for multi-word identifiers in image names without requiring underscores.
- Resolved parsing errors caused by trailing inline comments and empty lines within indented blocks.

### Known Issues
- Missing support for variable declaration statements (`define`, `default`).
- Missing support for audio control statements (`play`, `stop`, `queue`).
- GUI and layout blocks are not yet parsed (`screen`, `style`, `transform`, `image`).
- Transition statements (`with`) are not yet explicitly mapped.

> [!NOTE]
> Please be wary before using this project since this project is heavily AI influenced—the repository owner is still learning on C and tree-sitter topic.