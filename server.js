const express = require('express');
const app = express();
const fs = require('fs')
const mysql = require('promise-mysql');

//on va pouvoir stocker nos images que l'on télécharge du front dans un dossier static qui se situe dans le dossier public
const fileUpload = require('express-fileupload');
app.use(fileUpload({
    createParentPath: true
}));

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//nous évite que le navigateur bloque nos requêtes ajax
const cors = require('cors');
app.use(cors());

app.use(express.static(__dirname + '/public'));
//mysql://b0855a60ce40f4:87cd764d@eu-cdbr-west-02.cleardb.net/heroku_6ffb4de0c8d1925?reconnect=true
mysql.createConnection({
	host: "eu-cdbr-west-02.cleardb.net",
	database: "heroku_6ffb4de0c8d1925",
	user: "b0855a60ce40f4",
	password: "87cd764d"
	//port: 8889
}).then((db) => {
	console.log('connecté bdd');
	setInterval(async function () {
		let res = await db.query('SELECT 1');
	}, 10000);
	
	app.get("/", (req,res,next)=>{
	    res.json({status: 200, msg: "Welcome to your annonces API bro!"})
	})

    app.get('/api/v1/ads', async(req,res,next)=>{
        let adsBDD = await db.query('SELECT * FROM ads');

        if(adsBDD.code){
            res.json({status:500, error_msg: adsBDD})
        }
        res.json({status:200, results:{msg: "Success", ads: adsBDD}})
    })

		//route de récupération d'un article par son id
		app.get('/api/v1/ads/:id', async (req, res, next)=>{
			let id = req.params.id;
			let adBDD = await db.query('SELECT * FROM ads WHERE Id = ?', [id])
		
			if(adBDD.code) {
				let error = {
					status: 500,
					error_msg: adBDD
				}
				res.json(error);
			}
			if(adBDD.length === 0) {
				let error = {
					status: 404,
					error_msg: "Not Found"
				}
				res.json(error);
			}
			
			let response = {
				status: 200,
				results: {
					ad: adBDD[0]
				}
			}
			res.json(response);
		})

    app.post('/api/v1/ads/save', (req, res, next)=>{
	    db.query('INSERT INTO ads (Title, Contents, CreationTimestamp, Url) VALUES (?, ?, NOW(), ?)', [req.body.title, req.body.contents, req.body.url ])
		.then((result, err)=>{
		    if(err){
		        res.json({status: 500, msg: "pb ajout", error: err})
		    }
		    res.json({status: 200, result: "success"})
		    
		})
		.catch(err=>console.log("Error ajout:", err))
	})

	//route pour enregistrer une image vers notre dossier static
	app.post('/api/v1/ads/pict', (req, res, next)=>{
		console.log(req.files.image);
		//si on a pas envoyé de req.files via le front ou que cet objet ne possède aucune propriété
		if (!req.files || Object.keys(req.files).length === 0) {
			//on envoi une réponse d'erreur
	    	 res.json({status: 400, msg: "La photo n'a pas pu être récupérée"});
	    }
	    
	    //la fonction mv va envoyer l'image dans le dossier que l'on souhaite.
	    req.files.image.mv('public/images/'+req.files.image.name, function(err) {
	    	console.log('ça passe', '/public/images/'+req.files.image.name)
	    	//si ça plante dans la callback
		    if (err) {
		    //renvoi d'un message d'erreur
		      res.json({status: 500, msg: "La photo n'a pas pu être enregistrée"})
		    }
	    	
	    })
		//on doit renvoyer le nom de l'image dans la reponse vers le front car il en aura besoin pour pouvoir enregistrer le nom de l'image dans la bdd lors de la sauvegarde de l'annonce
		res.json({status: 200, msg: 'ok', url: req.files.image.name});
	})
	// dans mon front je purrais chopper l'image avec l'url "localhost:3000/images/" + name

	//route de modification
	app.put('/api/v1/ads/update/:id', (req, res, next)=>{
		let id = req.params.id;
		db.query('UPDATE ads SET Title=?, Contents=? WHERE Id = ?', [req.body.title, req.body.contents, id])
		.then((result, err)=>{
			if(err){
				res.json({status: 500, err: err})
			}
			res.json({status: 200, msg: "succes to update ads : "+id})
		})
	})
		
	//route de suppression
	app.delete('/api/v1/ads/delete/:id', (req,res,next)=>{
		db.query('SELECT * FROM ads WHERE id = ?',[req.params.id])
		.then((result,err)=>{
			let nameImg = result[0].url
			db.query('DELETE FROM ads WHERE id = ?',[req.params.id])
			.then((res,err)=>{
				if(err){
					res.json({status: 500, msg: "pb ajout", error: err})
				}
				if(nameImg !== "no-pict.jpg"){
					fs.unlink('public/Images/'+nameImg, (err)=>{
						if(err){
							res.json({status:500, msg: "big pb image non supp", error: err})
						}
					})
				}
				console.log("Deleted")
			})
			res.json({status: 200, msg: "delete success id: "+req.params.id})
			.catch(err=>{console.log("Error Update: ",err)})
		})
	})
	
})
.catch(err=>console.log("Erreur Connection: ", err))

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
	console.log('listening port '+PORT+' all is ok');
})