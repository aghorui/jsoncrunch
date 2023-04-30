# JsonCrunch

JsonCrunch is a JSON viewing, transformation and querying tool meant for quickly
manipulating small to medium size pieces of JSON data.

**[Open in Browser][applink]**

![screenshot][screenshot]

## Motivation

* Not many GUI tools exist for viewing JSON files, querying them or editing
  them. Have to fall back on writing small scripts to extract information or
  change something in trivial cases.

* A lot of JSON files have very common patterns (referred to as **Idioms** by
  this app) for representing data, such as for tabulated data, tag sets,
  date/time as strings, url strings, memos and so on. I want a tool that
  automatically detects that and presents the object in a convenient form.

* I want a tool that can filter through a JSON document based on a member's
  path, key, value, type and so on.

* <small>~~padding out my resume~~</small>

## Setup

### Prerequisites

You will need [NodeJS][nodejs] (>= v16.17.0) and NPM (>= v8.15.0) installed.

### Setup Instructions

1. Open a terminal, clone this repository and go into the newly created
   directory.

```
git clone https://github.com/aghorui/jsoncrunch
cd jsoncrunch
```

2. Install dependencies.

```
npm install
```

3. To immediately run JsonCrunch, run the following command:

```
npm run dev
```

This will start a webserver in localhost at a certain port number from which the
application can be used. The full address to access the JsonCrunch instance will be
displayed in the terminal after you run the command.

If you want to build JsonCrunch instead, follow the next step.

4. To build JsonCrunch, run the following command:

```
npm run build
```

This will create a new directory called `dist` which will contain the app's
files. You can now run the application by popping the files in a http server and
then opening `index.html` from there.

For example, you can use the `http-server` package from NPM to start one:

```
npm install http-server -g # You might want to be root for this
cd ./dist
http-server
```

This will open a server that's hosting JsonCrunch on your local machine. The url
to access it will be shown in the terminal.

## License

This software is available under the AGPLv3. Please see [LICENSE.txt][license]
for the full license text.

```
Copyright (C) 2023  Anamitra Ghorui

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.

```

[applink]: http://aghorui.github.io/jsoncrunch
[screenshot]: ./doc/media/screenshot.png
[license]:    ./LICENSE.txt
[nodejs]:     https://nodejs.org