import java.text.SimpleDateFormat

node {
    def DEPLOY_YYYYMMDDHHMM
    script {
        def date = new Date()
        def dateFormat = new SimpleDateFormat("yyyyMMddHHmm")
        dateFormat.setTimeZone(TimeZone.getTimeZone("Asia/Seoul"))
        DEPLOY_YYYYMMDDHHMM = dateFormat.format(date)
    }
    def PRODUCTION_CREDENTIALS_ID = '3487ee3c-7a1c-434a-97e0-7f183a0cd771'
    def PRODUCTION_BRANCH = 'production-0'
    def PRODUCTION_USER = 'youdig'
    def PRODUCTION_HOST = '34.64.85.152'
    def GCP_CLIENT_HOST = '172.17.0.1'
    def PM2_INIT_COMMAND = '\'pm2 delete www; \
                            rm -rf /home/'+PRODUCTION_USER+'/test01; \
                            exit;\''
    def SOURCE_PATH = '/var/jenkins_home/workspace/touchad-'+PRODUCTION_BRANCH+'@script'
    def PM2_START_COMMAND = '\'mv /home/'+PRODUCTION_USER+'/test01-'+PRODUCTION_BRANCH+'@script \
                            /home/'+PRODUCTION_USER+'/test01; \
                            cd /home/'+PRODUCTION_USER+'/test01; \
                            npm install; \
                            pm2 start ./bin/www; \
                            exit;\''

    stage ('init') {
        sshagent(credentials : [PRODUCTION_CREDENTIALS_ID]) {
            sh 'ssh '+PRODUCTION_USER+'@'+PRODUCTION_HOST+' -o StrictHostKeyChecking=no ' + PM2_INIT_COMMAND
        }
    }
    
    stage ('upload') {
        sh 'scp -r '+SOURCE_PATH+' '+PRODUCTION_USER+'@'+PRODUCTION_HOST+':/home/'+PRODUCTION_USER
    }

    stage ('deploy') {
        sshagent(credentials : [PRODUCTION_CREDENTIALS_ID]) {
            sh 'ssh '+PRODUCTION_USER+'@'+PRODUCTION_HOST+' -o StrictHostKeyChecking=no ' + PM2_START_COMMAND
        }        
    }

}
