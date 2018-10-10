import * as express from 'express';
import * as path from 'path';
import * as fs from 'fs';

let dirname = path.dirname(require.main.filename) + '/phangular';

let app : express.Application = express();
let port = 8080;

app.use(express.static(dirname));

let json : any = null;

fs.readFile('scores.json', (err : NodeJS.ErrnoException, data : Buffer) =>
{
    json = JSON.parse(data.toString());
});

app.get('/', (req, res) => {
    res.sendFile(dirname + '/index.html');
});

app.get('/score', (req, res) => {
    if(json == null)
    {
        res.send({status: 'retry'});
    }
    else
    {
        res.send({status: 'ok', data: json.scores});
    }
})

app.listen(port, () => console.log('Listening on port ' + port));