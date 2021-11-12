# Introduction

Based on [Sessionstore](https://github.com/adrai/sessionstore) by Adriano Raiano, this [npm](https://npmjs.org/package/sessionstore-cloudant
) adds the additional connector to IBM's Cloudant Database, which is a production deployment of [couchdb](http://couchdb.apache.org/).

# Installation

    $ npm install sessionstore-cloudant

# Usage

For use of the other connectors in this library, we refer you to the [README](https://github.com/adrai/sessionstore/blob/master/README.md) of sessionstore, by Adriano Raiano.

## Connecting to Cloudant

    var cloudantSessionStore = sessionstore.createSessionStore({
	type: 'couchdb',
	host: database.protocol + '//' + database.hostname,
	port: port,
	dbName: ev.DB_PREFIX + 'sessions',
	options: {
			auth: {
				username: user,
				password: pass
			},
			cache: false
		}
	});

	cloudantSessionStore.on('connect', function() {
		console.log('Connected to session store successfully!');
	});
	var sessionMiddleware = session({
		secret: 'keyboardcat',
		store: cloudantSessionStore,
		saveUninitialized: false,
		resave: false
	});

# License

Copyright (c) 2015 Adriano Raiano

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
