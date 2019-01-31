import { Container } from 'unstated-x'
import ElementContainer, { PathContainer } from './ElementContainer'
import { Maps } from '../helpers/mapping'
import axios from 'axios'
import { Env } from '../env'
import {toast} from 'react-toastify'

export class TemplateContainer extends Container {

    static template = {}


    constructor() {
        super()
        this.state = {
            resources: Array.from(ElementContainer.instances),
            paths: Array.from(PathContainer.instances),
            stackName: null
        }
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

            }
        }

        resources.forEach(e => {
            if (!e.data.state.Name) {
                console.log('checkdda', e.data)
                isValid = false
                return
            } else {
                switch (e.state.type) {
                    case "AWS::EC2::Instance": {
                        let tags = e.data.state.Tags
                        if (tags.map(e => e.Key).indexOf('Name') !== -1) {
                            tags[tags.map(e => e.Key).indexOf('Name')].Value = e.data.state.Name
                        } else {
                            tags.push({
                                "Key": "Name",
                                "Value": e.data.state.Name
                            })
                        }

                        template.Resources[e.data.state.Name] = {
                            "Type": e.state.type,
                            "Properties": {
                                "InstanceType": e.data.state.InstanceType,
                                "ImageId": {
                                    "Fn::FindInMap": ["AWSRegionArch2AMI", { "Ref": "AWS::Region" },
                                        { "Fn::FindInMap": ["AWSInstanceType2Arch", e.data.state.InstanceType, "Arch"] }]
                                },
                                "Tags": e.data.state.Tags

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

                }

            }
        })

        window.template = template

        paths.forEach(e => {
            const point1 = ElementContainer.get(e.state.point1)
            window.point1 = point1
            const point2 = ElementContainer.get(e.state.point2)
            window.point2 = point2

            /// Path between EC2 && SecurityGroup
            if (point1.state.type === 'AWS::EC2::Instance') {
                let refs = template.Resources[point1.data.state.Name].Properties[`${point2.state.type.split('::')[2]}s`]
                if (refs && refs.length) {

                    refs.push({ "Ref": point2.data.state.Name })
                    template.Resources[point1.data.state.Name].Properties[`${point2.state.type.split('::')[2]}s`]
                        = refs
                } else {
                    template.Resources[point1.data.state.Name].Properties[`${point2.state.type.split('::')[2]}s`]
                        = [{ "Ref": point2.data.state.Name }]
                }
            } else if (point2.state.type === 'AWS::EC2::Instance') {
                let refs = template.Resources[point2.data.state.Name].Properties[`${point1.state.type.split('::')[2]}s`]
                if (refs.length) {

                    refs.push({ "Ref": point1.data.state.Name })
                    template.Resources[point2.data.state.Name].Properties[`${point1.state.type.split('::')[2]}s`]
                        = refs
                } else {
                    template.Resources[point2.data.state.Name].Properties[`${point1.state.type.split('::')[2]}s`]
                        = [{ "Ref": point2.data.state.Name }]
                }
            }

             
            /// Path between EC2 && IAM
            if (point1.state.type === 'AWS::EC2::Instance' && point2.state.type === 'AWS::IAM::InstanceProfile') {
                template.Resources[point1.data.state.Name].Properties["IamInstanceProfile"] = point2.data.state.Name
            } else if (point2.state.type === 'AWS::EC2::Instance' && point1.state.type === 'AWS::IAM::InstanceProfile') {
                template.Resources[point2.data.state.Name].Properties["IamInstanceProfile"] = point1.data.state.Name
            }
        })


        if (isValid) {
           // console.log('check ', JSON.stringify(template))
            return JSON.stringify(template)
        } else {
            return false
        }
    }

    static exportAndRun = async () => {
        //const isValid = true
        const template = TemplateContainer.exportTemplate()
        if (!template) {
            alert('khong dung roii lam lai di !!')
        } else if(!templateContainer.state.stackName){
            console.log('check template Name')
            alert('Chưa điền stack name')
        } else {
            const params = {
                StackName: templateContainer.state.stackName,
                TemplateBody: template
            }

            const res = await axios.post(`${Env.URL}/createcloudformation `, params)
            console.log('chekkkkkk', res.data)
            if(res.data.errorMessage){
                alert(res.data.errorMessage)
            }
        }

    }


    static importTemplate = async () => {
        
    }

}

const templateContainer = new TemplateContainer()
export default templateContainer
