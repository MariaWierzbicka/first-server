const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const multer  = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage })

const app = express();

app.use(express.static(path.join(__dirname, '/public')));

app.engine('.hbs', hbs());
app.set('view engine', '.hbs');

app.get('/hello/:name', (req, res) => {
  res.render('hello', { name: req.params.name });
});

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/info', (req, res) => {
  res.render('info');
});

app.get('/history', (req, res) => {
  res.render('history');
});

app.use(express.urlencoded({ extended: false }));

app.post('/contact/send-message', upload.single('fileInput'), (req, res) => {

  const { author, sender, title, message } = req.body;
  const file = req.file;

  if(author && sender && title && message && file) {
    res.render('contact', { isSent: true, filename: file.originalname });
  }
  else {
    res.render('contact', { isError: true });
  }

});

app.use((req, res) => {
  res.status(404).send('404 not found...');
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});