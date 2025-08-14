import express from 'express'

const app = express();

// Callback για να ακουσει την πορτα 3000
app.listen(3000, () => {
    console.log ('Server is running on port 3000');
});