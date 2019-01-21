import { Container } from 'unstated-x'
import ElementContainer, { PathContainer } from './ElementContainer'
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
            name: 'caobo171222'
        }
    }

    static exportTemplate = () => {
        let isValid = true;

        const resources = Array.from(ElementContainer.instances).map(e => e[1])

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
                        tags.push({
                            "Key": "Name",
                            "Value": e.data.state.Name
                        })
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

                }

            }
        })

        if (isValid) {
            return JSON.stringify(template)
        } else {
            return false
        }
        console.log('check ', JSON.stringify(template))



    }

    static exportAndRun = async () => {
        //const isValid = true
        const template = TemplateContainer.exportTemplate()
        if (!template) {
            alert('khong dung roii lam lai di !!')
        } else {
            const params = {
                StackName: templateContainer.state.name,
                TemplateBody: template
            }

            const data = await axios.post(`${Env.URL}/createcloudformation `, params)
            console.log('chekkkkkk', data)
        }

    }

}

const templateContainer = new TemplateContainer()
export default templateContainer
