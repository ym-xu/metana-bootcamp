const fs = require('fs');

// fs.readFile('./test.js', (err, data)=> {
//     if (err) {
//         console.log(err);
//     }
//     console.log(data.toString());
// });


// console.log('last line');


// fs.writeFile('./docs/blog2.txt', 'hello world', () => {
//     console.log('file was written');
// })

// if (!fs.existsSync('./ahhh')){
//     fs.mkdir('./ahhh', (err) => {
//         if (err){
//             console.log(err);
//         }
//         console.log('folder created');
//     })
// }
// else{
//     fs.rmdir('./ahhh', (err) => {
//         if (err) {
//             console.log(err);
//         }
//         console.log('folder deleted');
//     })
// }

// if (fs.existsSync('./docs/deleteme.txt')){
//     fs.unlink('./docs/deleteme.txt', (err)=>{
//         if (err) {
//             console.log(err)
//         }
//         console.log('file deleted');
//     })
// }


const readStream = fs.createReadStream('./docs/blog3.txt', { encoding : 'utf8'});
const writeStream = fs.createWriteStream('./docs/blog4.txt');

// readStream.on('data', (chunk) => {
//     console.log('------ NEW CHUNK -------')
//     console.log(chunk);
//     writeStream.write('\nNEW CHUNK\n');
//     writeStream.write(chunk);
// });

readStream.pipe(writeStream);