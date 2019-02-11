import { Container } from 'unstated-x'
import ElementContainer, { PathContainer } from './ElementContainer'
import workspaceContainer from './WorkspaceContainer'
import { Maps } from '../helpers/mapping'
import axios from 'axios'
import { Env } from '../env'

export class TemplateContainer extends Container {

    static template = {}


    constructor() {
        super()
        this.state = {
            resources: Array.from(ElementContainer.instances),
            paths: Array.from(PathContainer.instances),
            stackName: ''
        }
    }

    static clear = () => {
        ElementContainer.instances.clear()
        PathContainer.instances.clear()
    }

    static reset = () => {
        templateContainer.setState({
            paths: Array.from(PathContainer.instances),
            resources: Array.from(ElementContainer.instances)
        })
    }

    static exportTemplate = () => {
        let isValid = true;
        const resources = Array.from(ElementContainer.instances).map(e => e[1])
        const paths = Array.from(PathContainer.instances).map(e => e[1])

        let template = {
            "AWSTemplateFormatVersion": "2010-09-09",
            "Description": "AWS CloudFormation Sample Template",
            "Mappings": Maps,
            "Resources": {

            },
            "Outputs": {

            },
            "Metadata": {
                "VTI::DesignElement": {

                },
                "VTI::DesignPath": {

                }
            }


        }

        resources.map(e => {
            if (!e.data.state.Name) {
                console.log('checkdda', e.data)
                isValid = false
                return
            } else {
                template.Metadata['VTI::DesignElement'][e.data.state.Name] = {
                    x: e.state.x,
                    y: e.state.y
                }

                switch (e.state.type) {
                    case "AWS::EC2::Instance": {
                        template.Resources[e.data.state.Name] = {
                            "Type": e.state.type,
                            "Properties": {
                                "InstanceType": e.data.state.InstanceType,
                                "ImageId": {
                                    "Fn::FindInMap": ["AWSRegionArch2AMI", { "Ref": "AWS::Region" },
                                        { "Fn::FindInMap": ["AWSInstanceType2Arch", e.data.state.InstanceType, "Arch"] }]
                                },
                                "Tags": [...e.data.state.Tags, {
                                    "Key": "Name",
                                    "Value": e.data.state.Name
                                }],
                                "UserData": {
                                    "Fn::Base64": {
                                        "Fn::Join": ["", [
                                            `#!/bin/bash\n`,
                                            `sed -i 's/PasswordAuthentication no/PasswordAuthentication yes/g' /etc/ssh/sshd_config\n`,
                                            `service sshd reload\n`,
                                            `password="tuilacao171"\n`,
                                            `pass=$(perl -e 'print crypt($ARGV[0], "password")' $password)\n`,
                                            `useradd -m -p $pass cao171\n`,
                                            `sed -i 's/Allows people in group wheel to run all commands/Allows people in group wheel to run all commands \\n cao171   ALL=(ALL)  NOPASSWD:ALL/g' /etc/sudoers\n`
                                        ]]
                                    }
                                }

                            }
                        }
                        break
                    }
                    case "AWS::EC2::SecurityGroup": {
                        template.Resources[e.data.state.Name] = {
                            "Type": e.state.type,
                            "Properties": {
                                "GroupName": e.data.state.Name,
                                "GroupDescription": e.data.state.GroupDescription,
                                "SecurityGroupIngress": e.data.state.SecurityGroupIngress
                            }
                        }
                        break
                    }
                    case "AWS::IAM::InstanceProfile": {
                        template.Resources[e.data.state.Name] = {
                            "Type": e.state.type,
                            "Properties": {
                                "InstanceProfileName": e.data.state.Name,
                                "Roles": e.data.state.Roles
                            }
                        }

                        break
                    }
                    case "AWS::RDS::DBSecurityGroup": {
                        template.Resources[e.data.state.Name] = {
                            "Type": e.state.type,
                            "Properties": {
                                "GroupDescription": e.data.state.GroupDescription,
                                "DBSecurityGroupIngress": e.data.state.DBSecurityGroupIngress
                            }
                        }
                        break
                    }
                    case "AWS::RDS::DBInstance": {
                        template.Resources[e.data.state.Name] = {
                            "Type": e.state.type,
                            "Properties": {
                                "AllocatedStorage": "100",
                                "DBInstanceClass": e.data.state.DBInstanceClass,
                                "Engine": e.data.state.Engine,
                                "Iops": "1000",
                                "MasterUsername": 'cao171',
                                "MasterUserPassword": 'tuilacao171',
                                "DBInstanceIdentifier": e.data.state.Name
                            }
                        }
                    }
                    default:
                        break

                }

            }
        })

        window.template = template

        paths.forEach(e => {
            const point1 = ElementContainer.get(e.state.point1)
            const name1 = point1.data.state.Name

            const point2 = ElementContainer.get(e.state.point2)
            const name2 = point2.data.state.Name

            template.Metadata['VTI::DesignPath'][name1 + '$$' + name2] = {
                start: e.state.start,
                end: e.state.end,
                peak: e.state.peak

            }

            /// Path between EC2 && SecurityGroup
            if (point1.state.type === 'AWS::EC2::Instance' && point2.state.type === 'AWS::EC2::SecurityGroup') {
                const type = 'SecurityGroups'
                let refs = template.Resources[point1.data.state.Name].Properties[type]
                if (refs && refs.length) {

                    refs.push({ "Ref": point2.data.state.Name })
                    template.Resources[point1.data.state.Name].Properties[type]
                        = refs
                } else {
                    template.Resources[point1.data.state.Name].Properties[type]
                        = [{ "Ref": point2.data.state.Name }]
                }
            } else if (point2.state.type === 'AWS::EC2::Instance' && point1.state.type === 'AWS::EC2::SecurityGroup') {
                const type = 'SecurityGroups'
                let refs = template.Resources[point2.data.state.Name].Properties[type]
                if (refs.length) {

                    refs.push({ "Ref": point1.data.state.Name })
                    template.Resources[point2.data.state.Name].Properties[type]
                        = refs
                } else {
                    template.Resources[point2.data.state.Name].Properties[type]
                        = [{ "Ref": point2.data.state.Name }]
                }
            }


            /// Path between EC2 && IAM
            if (point1.state.type === 'AWS::EC2::Instance' && point2.state.type === 'AWS::IAM::InstanceProfile') {
                template.Resources[point1.data.state.Name].Properties["IamInstanceProfile"] = point2.data.state.Name
            } else if (point2.state.type === 'AWS::EC2::Instance' && point1.state.type === 'AWS::IAM::InstanceProfile') {
                template.Resources[point2.data.state.Name].Properties["IamInstanceProfile"] = point1.data.state.Name
            }


              /// Path between RDS && DBSecurityGroup
              if (point1.state.type === 'AWS::RDS::DBInstance' && point2.state.type === 'AWS::RDS::DBSecurityGroup') {
                const type = 'DBSecurityGroups'
                let refs = template.Resources[point1.data.state.Name].Properties[type]
                if (refs && refs.length) {

                    refs.push({ "Ref": point2.data.state.Name })
                    template.Resources[point1.data.state.Name].Properties[type]
                        = refs
                } else {
                    template.Resources[point1.data.state.Name].Properties[type]
                        = [{ "Ref": point2.data.state.Name }]
                }
            } else if (point2.state.type === 'AWS::RDS::DBInstance' && point1.state.type === 'AWS::RDS::DBSecurityGroup') {
                const type = 'DBSecurityGroups'
                let refs = template.Resources[point2.data.state.Name].Properties[type]
                if (refs && refs.length) {

                    refs.push({ "Ref": point1.data.state.Name })
                    template.Resources[point2.data.state.Name].Properties[type]
                        = refs
                } else {
                    template.Resources[point2.data.state.Name].Properties[type]
                        = [{ "Ref": point2.data.state.Name }]
                }
            }
        })


        if (isValid) {
            console.log('check ', JSON.stringify(template))
            return JSON.stringify(template)
        } else {
            console.log('check sai')
            return false
        }
    }

    static exportAndRun = async () => {
        //const isValid = true
        const template = TemplateContainer.exportTemplate()
        if (!template) {
            alert('khong dung roii lam lai di !!')
        } else if (!templateContainer.state.stackName) {
            console.log('check template Name')
            alert('Chưa điền stack name')
        } else {
            const params = {
                StackName: templateContainer.state.stackName,
                TemplateBody: template,
                mode: workspaceContainer.state.mode
            }

            const res = await axios.post(`${Env.URL}/createcloudformation `, params)
            console.log('chekkkkkk', params, res.data)
            if (res.data.errorMessage) {

                alert(res.data.errorMessage)
            }
        }

    }


    static importTemplate = async (template) => {
        console.log('check inside')
        TemplateContainer.clear()

        const elements = Object.keys(template.Resources)
        await elements.forEach(name => {
            const element = template.Resources[name]
            console.log('check element', element)
            const { x, y } = template.Metadata["VTI::DesignElement"][name]
            let el = ElementContainer.addElement({ type: element.Type, x, y })
            el.data.setState({
                ...template.Resources[name].Properties,
                Name: name
            })



        })



        const paths = Object.keys(template.Metadata["VTI::DesignPath"])

        await paths.forEach(path => {
            let [point1, point2] = path.split('$$')
            window.point1 = point1
            window.point2 = point2
            point1 = ElementContainer.getByName(point1).state.id
            point2 = ElementContainer.getByName(point2).state.id
            const { start, end, peak } = template.Metadata["VTI::DesignPath"][path]
            PathContainer.addPath({ point1, point2, start, end, peak })
        })

        TemplateContainer.reset()
    }

}

const templateContainer = new TemplateContainer()
export default templateContainer
