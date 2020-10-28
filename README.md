# node-chat-server
 A simple chat server built with express, JWT, sockets

## TODO

- [ ] Add authentication (link with JWT generation)

- [ ] Add other forms of messages:

    - [ ] Videos

    - [ ] Audio

    - [ ] Images

    - [ ] Gifs


## Note

Current version simply accepts the userId (generated with UUIDv4) to authenticate the user. This should be replaced with a different authentication system like:

- Passport

- OAuth

The JWT secret, mongo configs can be found in `/server/config`

## Tips

- Use the keygenerator in `/server/utils/GenerateSecret.js` to generate a JWT secret

    ```bash
    cd /server/utils/
    node GenerateSecret.js
    ```

## Get Started

```bash
cd server
npm install
```

```
cd /server
npm start
```