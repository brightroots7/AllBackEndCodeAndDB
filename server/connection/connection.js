const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://moodvies:Moviemood$@cluster0.k9hvg.mongodb.net/moodvies?retryWrites=true&w=majority')
.then(()=>{
    console.log('connected to mongodb');
}).catch((error)=>{
    console.log(error);
})
