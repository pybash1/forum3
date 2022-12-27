## v1.0.0 (2022-12-27)

### Fix

- **env**: the component can now detect context from environment variables in react, next.js, and vite
- **bug**: fixed bug where new msg indicator turned on even if the msg was sent by the user
- fixed html sanitization
- added load more button along with realtime updates
- fixed minor bug
- imprved error pages and now dynamic based on error status code
- fixed minor bugs
- fixed minor bugs
- fixed bug where configuration and components both were highlighted in configuration page
- **changelog**: removed placeholders from changelog and added CHANGELOG.md file
- minor bug fixes, improvements and layout changes
- forgot to add file in previous commit
- updated assets, manifest, and sources
- fixed major ui bug where background was behind other text
- fixed minor bugs and issues and made minor improvements
- more minor bug fixes and improvements
- fix some minor bugs and formatting
- **colors**: now notifications match theme
- **scroll**: fixed autoscroll, now it scrolls only once, and after each new message sent
- fixed bug where context provided as prop was not being used

### Feat

- **images**: added prop to disable image sharing
- **props**: added prop to disable indicator
- **indicator**: added indicator when new messages are received
- improved load more functionality
- **confirmation**: file upload now has a confirmation dialog
- **media**: images can now be upload thru forum3 by using ipfs
- **props**: added new prop to declare certain wallet addresses as admins
- made the changelog page dynamic
- **env**: context is now optional and env var named REACT_APP_FORUM_CONTEXT can be set instead to load context
- **props**: more customizable properties for Forum component
- **components-page**: added docs for each component separately and fixed minor bugs
- added components page and minor bug fixes
- added configuration docs along with subdocs of configuration except env vars
- **introduction**: completed introduction subpages with feedback page(without functionality)
- added introduction page and created new sidebar for docs pages with improved dynamic navbar component
- added routing and 404 page
- **animation**: improved animation and added staggering
- **meta**: improved seo and tags
- complete landing page
- improved landing page
- basic landing page design
- **notifications**: added notifications instead of console.logs
- added sender address
- **replies**: improved replies ui with link detection and styling
- added link detection and basic styling options thru html
- added basic reply functionality and ui
- **reply**: added reply ui
- **scroll**: added auto scroll to bottom of messages
- **message**: now messages can be seen and only sent in custom context
- added functionality to create posts/messages
- **forum**: forum component with connection functionality
- **init**: generated project structure and boilerplate

### BREAKING CHANGE

- added media support
