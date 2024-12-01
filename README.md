# WeCourts Serverless Utils
a set of serverless functions that we utilize at WeCourts

---

### used commands to setup this project (you may skip this)

```bash
doctl serverless namespaces create --label support-form-proxy --region fra1
```

### first time setup

* you need to have `doctl` command available in your terminla (Digital Ocean CLI)
* once the command `doctl` is available, you need to authenticate it locally, by first creating a personal access token from digital ocean, then you can authenticate by following these steps
* install node js dependencies


```bash
# here we're creating a context named wecourts, it can be named anything
# you will be asked to enter your personal token that you have created from previous step
# once you complete this step, you are authenticated with wecourts digital ocean account
doctl auth init --context wecourts
```

```bash
npm install
```

### deployment

```bash
# if you want the build to be triggered remotely on digital ocean machines
doctl serverless deploy support-form-proxy --remote-build
# <<not recommended>> if you want to trigger the build locally on your machine
doctl serverless deploy support-form-proxy
```

### invoking function remotely

```bash
doctl serverless functions invoke main/form_proxy
```

### running tests

```bash
npm test
```