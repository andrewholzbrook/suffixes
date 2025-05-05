Scan a directory as it's being made.

Display the graph of the directory structure.

Each node is a file or directory.

Each node has a list of properties.

A text field at the top with fuzzy filter fades out the graph nodes as they are filtered out.

This also works for properties on the nodes, which would be the DB fields for that domain object.

You can define relationships between nodes.

Each node would have toggleable slices of architecture.

For example.

- /shirt
- /shirt/#id.property.ts
- /shirt/#size.property.ts
- /my/shirts/
- /my/shirt/#{property-name}{type}.{ts/js/c++/py/rust/etc}
-          /receipt.ts
-          /size.ts
- /my/shirt/shirt.{layer}.{ts/js/c++/py/rust/etc}
  - **UI Layers:**
    - `/shirt.ui.component.ts`
    - `/shirt.ui.page.ts`
    - `/shirt.ui.view.ts`
    - `/shirt.ui.layout.ts`
    - `/shirt.ui.form.ts`
    - `/shirt.ui.card.ts`
    - `/shirt.ui.list.ts`
  - **Data Layers:**
    - `/shirt.data.model.ts`
    - `/shirt.data.schema.ts`
    - `/shirt.data.query.ts`
    - `/shirt.data.mutation.ts`
    - `/shirt.data.validation.ts`
    - `/shirt.data.store.ts`
    - `/shirt.data.seed.ts`
  - **Logic/Service Layers:**
    - `/shirt.service.ts`
    - `/shirt.usecase.ts`
    - `/shirt.controller.ts`
    - `/shirt.handler.ts`
    - `/shirt.logic.ts`
    - `/shirt.domain.logic.ts`
  - **API/Adapter Layers:**
    - `/shirt.api.client.ts`
    - `/shirt.api.controller.ts`
    - `/shirt.adapter.http.ts`
    - `/shirt.adapter.db.ts`
    - `/shirt.adapter.graphql.ts`
  - **Testing Layers:**
    - `/shirt.test.unit.ts`
    - `/shirt.test.integration.ts`
    - `/shirt.test.e2e.ts`
    - `/shirt.spec.ts`
    - `/shirt.fixture.ts`
  - **Configuration Layers:**
    - `/shirt.config.ts`
    - `/shirt.constants.ts`
    - `/shirt.types.ts`
    - `/shirt.routes.ts`
  - **Documentation Layers:**
    - `/shirt.docs.md`
    - `/shirt.readme.md`
- /pages
- /pages/
- /\_/auth/login.ts
- /\_/auth/signup.ts
- /\_/log.ts
- /\_/{way more ideas than this}.ts

- Website idea...
- ...dynamically created web pages generated dynamically from properties
- ...build your own page, generated with user templates, AI suggested layouts, and suggest possible connections to other domains in your created page
- ...when you build a page, a layout is chosen for you based on related terms, common suggested related terms, and terms limited to the other domains you already have
- ...
- ...nfc tag these things and make a habit of tagging your habits by placing these NFC tags throughout your house
- ...define properties/stores on each node in the domain
- ...define trigger conditions

- `/my`
  - shows a dashboard
- `/my/tvs`
- `/myshoes`
- `/my/people`
- `/my/finance/accounts`
- `/my/friends`
- `/my/priorities`
- `/my/walmart` - a curated view of walmart, with curated cards, and curated properties
- `/my/opinions`
- `/science`
- `/sports` - your view of the outside world of sports, starting in explorer mode
- `/my/sports` - your view of sports you play, empty state starts with you explore the "my sports"-verse, it might be a thing where you fly

- "Floating... somewhere... space? Sleeping or meditating (encouraging resting while away), your cursor is idle and animatedly idle, until an input wakes it up. You type, in one of many ways, into the cursor. You type a few thoughts with [a-zA-Z+Shift#stream-of-thought-mode] and your thoughts fade away, but bubbles may pop up, or you type using markdown to start a bulleted list which would reveal a list under your cursor and you can list whatever you want, the list will name itself with the categories of list items that are in it. Domain bubles are able to be traveled into. If it's an abstract idea, it will have you flying around a differently themed _thing_ with other related concepts popping up.. you can declare if this is an (in context/out of context) rabbit hole., some domains are concrete, and you can travel _to_ it, Enter a domain, you fly/travel to it (intro/context switch), land on 2d ground, and you travel on foot/horse/car, then you enter
- as you're typing in [stream-of-thought-mode], your mind will start to race, and bubbles will start to appear on the right... depending on related ness
- like inception each rabit hole you go down has a shorter amount of time that you can be in it.. likely limited to some timer and sound that triggers you coming out of that scope and decide if it's in context or out of context.
- if an idea has relation to the thing you're trying to think of.. your destination... to which you are traveling to the domain of... through fucking arcadey side scrolling galaxy-hopping fun times
- as you pop bubbles, you unlock words and concepts, but you must pop them to unlock them
- you may pick up that word and do something with it...
  - commit it to memory
  - bring it into context
  - add onto the stack... inception... shortening timer... you dive _into_ that concept and are exposed to the "world" there
- each domain has its own art and theme
- each domain combined with another domain creates some crazy combination world, where the things are mixed up
- game mechanics could be built into this
- on any domain path, when examining any bubble, you can publish your anonymous opinion of that thing (seems kinda morally ambiguous... bullying seems problematic on a platform like this)
- Limit users to so many different data requests in an hour. Potentially large data issue + large
- On each node, you could potentially see data that people have tagged as relavent here, or even store on this node. Relations that matter according to people's recommendations, but also relations that are disputed.
- If you claim a relation publicly, you must leave that relation up for scrutiny otherwise take it down.
- Typing `"` enters a quote mode
- Typing `'` enters some other handy access mode
- Typing `/` opens up destination results in a thing, while you're still actively typing, and fuzzy results are coming in, either as a list or a grod/wrap/masonry/dynamic-bubble of those domains
- typing `!` does something cool
- typing `.` repeatedly shoots your "light shooter" ability... because this is a game
- calendar would affect your view... alerts growing, literally bigger, from the top left... bursting into your focus
- typing faster in stream of thought causes you to fly faster

- begin with the end in mind...
  - typing `/` and entering [[domain-edit-mode.md]] is a bit like stating your destination.. you know where you want to go
  - so you type with fuzzy filter results of matching domain paths
  - this might include tickets, it might include suggested
  - it might include activities, getting something done, or whatever...
  - each of those destinations would appear on the right of the screen
  - and if you don't have a destination, it's kind of like you're just free thinking, and maybe in the center and exploring ideas is much more... blobby
  - and if you, find a destination, which would appear in one of the bubbles, you might bring that into context to get kinda related results, or even see some filtered out results.. or you might make it your destination... which you would fly to... through a portal, through an asteroid field, through the ocean, whatever makes sense for that thing. Might even fly down onto the planet and land where the thing is
- every single word that you are taking in, either automatically through encountering it a lot, so you must know it, or manually when you pick up a word you just learned
- ignoring words might result in prompots that ask if you know the defintion of the word you encountered, and you literally have to guess
- if you get 5 new words in a day, you no longer have to guess
- on each word, you can see what the LLM choice as its relationship score and why it may have been selected as related, reasons and points in different categories of relation, for which I need a
- "work" dashboards can be a more dedicated traversal of the domain graph...though honestly.. that makes me stall on good feelings..kinda made me sad to think about

# Info - possible task to start Where can you display a VS Code (or VS Code-like) experience?

- Desktop Application (Electron): This is the standard way (VS Code, Cursor, VSCodium). Runs natively on Windows, macOS, Linux.
- Web Browser (Full Workbench): Via services like vscode.dev, github.dev, Gitpod, Codespaces, etc. These provide the familiar VS Code interface in a browser tab, connecting to remote compute and storage (or sometimes local via specific browser APIs/tunnels).
- Web Browser (Editor Component Only): You can embed the Monaco Editor library into your own web applications to get the core code editing features (syntax highlighting, basic completions, diff view, etc.). This is just the editor part, not the full VS Code UI, file explorer, terminal, or extension host.
- Inside VS Code via Webviews: VS Code extensions can create custom panels using standard web technologies (HTML, CSS, JavaScript). You could technically embed the Monaco Editor within a webview panel inside your main VS Code window if you needed a secondary, isolated editor instance for a specific purpose (like in your dashboard idea). But you aren't running a nested, separate full VS Code application window inside the webview.

- private first `/domain/page` creation, templates come from published places

# Powerful Idea - Page is _empty_,... well.. maybe... I was actually envisioning as a

# Powerful Idea - Page is empty except for a single text box.

# - This text box is wandering around the screen, kinda like it has a personality, pausing, and stopping in different spots.

# - From here, you can type out your stream of consciousness, or whatever prompts you want. Searches, questions,

# - it will sometimes answer by opening a little node of a thing

# - it will sometimes already have one open, and pull open a second one, a third one, however many it wants to hold up, and it can cycle through it

# - A page will fill in with likely associated concepts, and those would fill in on an automated layout

# - your view would remain fixed on that view, but you can see graph lines leading out off screen

# - you can go further away and see different nodes

# - each node has a different category of what kind of relationship it has with it, and its shape/color would change based on those categories

# -

# - example screen

/----B--B--B--B--B--
/------B----B--B---B--B---
/-----B---B---B--B---B-BBB--
/-------BB---B---B-----BBB---
/-------B-----B----B----BBB
/---S-----B----B---B-B--B--B
/------B---B--B-----B---B--B--B
/---B---B--B--B---B---B---B---B
/----B-B-----B--BB-----B

# - Legend

# - S is your cursor/keyboard input

# - B is every related concept to this thing

# - could be

# - single words

# - related idioms

# - web pages

# - single words

# - existing links to be reexplored

# - dynamic windows

# - dashboards

# - example screen 2

<!-- Mermaid -->

- `/

- Possible name

- Default file to keep open can just be `./_.md`, word wrap off

= Rules for files generation.

- There is a way to build each layer of these

- In Domain Map, much like the JS memory/file size graph looks like and clicks down into... Start at a birds eye view,

- one giant file?!

## Properties would be broken down into its own slices.

The slices are context specific.

In a view, show a web view with a file type picker and a code editor. You can select a file... If a file is added, display it

# Jumping into and out of contexts too much will cause you to

# Properties generated automatically from LLM, suggestions, your properties

# Sets of propertes allow for dynamic variants

# Variants can have variants

# Anyone can publish, an image of that variant

# I wonder if you can split databases/tables by `/domain` path? Does that help with keeping scale manageable? Does that mean a lof of the querying would be server side?

# Does the domain apth work well with a single table for it

# Ship of Thinkius has a way to take a note/random thought withint the context you're in and it just memos it

# Typing `@` is how you would chat to someone, or even... something!? chat to the concept of "molecule"?

# Typing Spacebar without anything in the recent text queue will do something cool

    [ ] - Morse code
    [ ] - Drum beat
    [ ] - Yawn?
    [ ] - Move your guy up, down in a springy motion

# Play real gameplay at the locations you go.

# Go to "the village" and it's a real JRPG 2d top down city where you can go visit different things

#

#
