# Edwin's Learning Journey

A home for Edwin Jr.'s learning apps, built for a phone. The homepage is a road, and each app is a stop on that road.

Live site: https://teacherzoled.github.io/edwin-learning-journey/

## What is here

| Folder | App | What it teaches |
| --- | --- | --- |
| `/` (`index.html`) | The hub | The road map with every stop |
| `numbers/` | Nano's Number Garage | Recognising numbers 1 to 10 without counting up |

Stops marked "Coming soon" on the homepage: Letter Road (letter sounds), Word Parking (sight words), Sentence Trip (sentences around Belize) and Book Racetrack (first books).

## Adding a new app

1. Put the app in its own folder with an `index.html`, for example `letters/index.html`.
2. In the root `index.html`, find the `STOPS` list and change that stop to `open:true` with its `href`, for example `href:"letters/"`.
3. Commit and push. GitHub Pages updates in about a minute.

## Notes

- Each app saves progress in the phone's browser storage. All apps share the website `teacherzoled.github.io`, so the hub can show progress from each app.
- Spanish is used only as a spoken meaning bridge. English always comes first, and Spanish never appears written on the child's screens.
