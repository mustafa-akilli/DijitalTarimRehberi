const express = require("express");
const router = express.Router();

const {knex} = require("./../data/db");



//routes

router.get('/shopping/:id', async (req, res) => {
    try {
        // Veritabanından ürünleri çek
        const urunler = await knex('urunler').select('*');
        
        // Alınan ürünleri "shopping.ejs" sayfasına ileterek görüntüle
        res.render('shopping', { satinAlinanUrunler: urunler });
    } catch (error) {
        console.error('Hata:', error);
        res.status(500).send('Sunucuda bir hata oluştu');
    }
});

router.post('/signup', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Kullanıcıyı veritabanında kontrol et
        const existingUser = await knex('users').where('username', username).first();

        if (existingUser) {
            // Kullanıcı zaten varsa hata mesajı gönder
            res.render('signup', { errorMessage: 'Bu kullanıcı adı zaten kullanılmaktadır.' });
        } else {
            // Kullanıcı yoksa, veritabanına ekleyin
            await knex('users').insert({ username, password });

            // Kayıt başarılı, istediğiniz sayfaya yönlendirin
            res.redirect('/login');
        }
    } catch (err) {
        console.error(err);
        res.status(3000).send('Sunucu hatası');
    }
});


 router.get('/login', (req, res) => {
     res.render('login');
 });

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log(username,password)
    
        //const [rows] = await connection.execute('SELECT * FROM users WHERE username = ?  AND password = ? ', [username, password]);
        const rows = await knex.select('*').from('users').where('username',username).andWhere('password',password)
        console.log(rows)
        if (rows.length > 0) {
            // Kullanıcı girişi başarılı
            res.redirect('/'); // Kullanıcı giriş yaptığında yönlendirilecek sayfayı belirtin
        } else {
            // Kullanıcı girişi başarısız
            res.render('login', { errorMessage: 'Kullanıcı adı veya şifre yanlış.' }); // hata mesajı oluşturuldu.
        }

    } catch (err) {
        console.error(err);
        res.status(3000).send('Sunucu hatası');
    }
});


router.use("/products/:id", async function(req,res) {
    try{
        //const [product, ] =  await db.execute("select * from products where id=?" , [req.params.id]);
        const [product] = await knex.raw("select * from products where id=?" , [req.params.id])
        res.render("product-details",  {
         urun : product[0]
     });
 
     }
     catch(err) {
         console.log(err);
     }  
});

router.use("/products", async function(req,res) {
    try{
        //const [products, ] =  await db.execute("select * from products where isActive=1");
        const [sehirler] = await knex.raw("select * from sehirler")
        console.log(sehirler)
        res.render("sehirler",  {
            urunler : sehirler
     });
 
     }
     catch(err) {
         console.log(err);
     }  
});

router.use("/", async function(req,res) {

    // async - await

    try{
       //const [products, ] =  await db.execute("select * from products where isHome=1 and isActive=1");
       const [products] = await knex.raw("select * from products where isHome=1")
       console.log(products)
       res.render("index",  {
        urunler : products
    });

    }
    catch(err) {
        console.log(err);
    }  
});




module.exports = router;