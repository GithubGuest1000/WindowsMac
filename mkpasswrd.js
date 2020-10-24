const 	crypto 	 = require('crypto'),
		fs 		 = require('fs'),
		PASSWORD = process.argv.slice(2).join(' ');

if(!PASSWORD) {
	console.log('Hello, im your helper to create the password.\nUsage: node mkpasswd <password>');
	process.exit(1);
} else {
	let hash = crypto.createHash('sha256').update(PASSWORD).digest();
	fs.writeFileSync('password.sha256', hash);
	console.log(`Password updated (${hash.toString('hex')}).`);
}
