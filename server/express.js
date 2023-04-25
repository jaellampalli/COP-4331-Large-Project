require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');
const MarkdownIt = require('markdown-it');
const md = new MarkdownIt();
const { MongoClient } = require('mongodb');
const cors = require('cors');

const usersRouter = require("./routes/usersRouter");
const lessonsRouter = require("./routes/lessonsRouter");

const app = express();
const port = process.env.PORT || 5000;

// Configuration
require('dotenv').config();
app.use(cors({ origin: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
console.log(__dirname)
app.use('/lessons', express.static(path.join(__dirname, 'lessons')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Multer config for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'lessons', req.params.lessonName));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

/* ========================================================================== */
/*                                   Routes                                   */
/* ========================================================================== */

app.get('/', async (req, res) => {
    res.render('index');
});

app.post('/search', async (req, res) => {
  const lessonName = req.body.lessonName.replace(/\s+/g, '-');
  res.redirect('/' + lessonName);
});

app.get('/:lessonName', async (req, res) => {
  const lessonName = req.params.lessonName;
  const lessonPath = path.join(__dirname, 'lessons', lessonName);

  // Create the lesson folder and text file if they do not exist
  if (!fs.existsSync(lessonPath)) {
    fs.mkdirSync(lessonPath, { recursive: true });

    // Create text
    const lessonTextPath = path.join(lessonPath, `${lessonName}.txt`);
    fs.writeFileSync(lessonTextPath, '', 'utf8');
  }

  // Format lesson name (fron kebab case to title case)
  const lessonNameFormatted = lessonName.split('-').map(word => word[0].toUpperCase() + word.slice(1)).join(' ');

  res.render('lesson', { lessonName: lessonNameFormatted });
});

// Render the lesson content
app.get('/lessons/:lessonName', async (req, res) => {
  try {
    const lessonName = req.params.lessonName;
    const lessonPath = path.join(__dirname, 'lessons', lessonName, `${lessonName}.txt`);
    const lessonContent = await fs.promises.readFile(lessonPath, 'utf8');
    const htmlContent = md.render(lessonContent);
    res.send(htmlContent);
  } catch (err) {
    res.status(404).send('Lesson not found');
  }
});

app.get('/lessons/:lessonName/raw', async (req, res) => {
    // Return the raw markdown content
    try {
        const lessonName = req.params.lessonName;
        const lessonPath = path.join(__dirname, 'lessons', lessonName, `${lessonName}.txt`);
        const lessonContent = await fs.promises.readFile(lessonPath, 'utf8');
        res.set('Content-Type', 'text/plain');
        res.send(lessonContent);
    } catch (err) {
        res.status(404).send('Lesson not found');
    }
});

app.post('/lessons/:lessonName/save', upload.single('image'), async (req, res) => {
  try {
    const lessonName = req.params.lessonName;
    const lessonPath = path.join(__dirname, 'lessons', lessonName);
    const lessonTextPath = path.join(lessonPath, `${lessonName}.txt`);
    const lessonImagePath = path.join(lessonPath, `main.png`);

    // Create the lesson folder if it does not exist
    if (!fs.existsSync(lessonPath)) {
      fs.mkdirSync(lessonPath, { recursive: true });
    }

    // Save the lesson content
    await fs.promises.writeFile(lessonTextPath, req.body.content, 'utf8');

    // Save the image if one is uploaded
    if (req.file) {
      const tempImagePath = req.file.path;
      await fs.promises.copyFile(tempImagePath, lessonImagePath);
      await fs.promises.unlink(tempImagePath);
    }

    // Redirect to the lesson page
    const lessonPage = `/${lessonName}`;
    res.redirect(lessonPage);

  } catch (err) {
    console.error(err);
    res.status(500).send('Error saving lesson');
  }
});

app.get('/lessons', async (req, res) => {
  try {
    const lessonsDir = path.join(__dirname, 'lessons');
    const lessonFolders = await fs.promises.readdir(lessonsDir);

    const lessons = lessonFolders.map(folder => {
      const lessonName = folder;
      const imagePath = path.join(lessonsDir, folder, 'main.png');
      return {
        name: lessonName,
        image: `/lessons/${lessonName}/main.png`
      };
    });

    res.send(lessons);
  } catch (err) {
    res.status(500).send('Error fetching lessons');
  }
});

app.get('/api/lessons', async (req, res) => {
  try {
    const lessonsDir = path.join(__dirname, 'lessons');
    const lessonFolders = await fs.promises.readdir(lessonsDir);

    const lessons = lessonFolders.filter(folder => folder !== 'lessons' && folder !== 'favicon.ico').map(folder => {
      const lessonName = folder;
      const imagePath = path.join(lessonsDir, folder, 'main.png');
      return {
        name: lessonName,
        image: `/lessons/${lessonName}/main.png`
      };
    });

    res.send(lessons);
  } catch (err) {
    res.status(500).send('Error fetching lessons');
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.use("/users", usersRouter);
app.use("/lessons", lessonsRouter);
