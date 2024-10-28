/auth/register
    # Sabse last ma aaune chai
        -----> auth.controller.js ===> register function 
    
    1 /index.js ===> createServer(app) ----> First ma index.js bata createServer ko help bata server banauxa 
    2 /src/config/express.config.js ==> .use(mainRouter) ----> server banepaxi config folder vitra express config vanne file bata mainRouter lai access garxa
    3 /src/config/router.config.js (Yesma mainROuter vanne function xa) ==> .use('/auth', authRouter) ----> Mainrouter le /auth vanne endpoint lai define gareko xa 
    4 /src/modules/auth/auth.router.js ===> .post('/register', bodyValidator()) ---> Auth router vanne file ma .post method ma /register vanne endpoint define gareko xa 
    
    5 /src/middleware/validator.middleware.js ===> export bodyValidator(schema) 


# Email Service 
    -> name, email, password, role, image
    -> store this on db 
-> user has to activate the account via email. 
        --> SMTP server
        smtp port -> 25

# Mongo DB Username and pass
    username -> sudilcs
    pass -> K0ErKrFhd2fWbSJP