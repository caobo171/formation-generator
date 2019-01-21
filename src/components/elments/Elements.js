
import EC2Instance from './EC2/EC2Instance'
import EC2SecurityGroup from './EC2/EC2SecurityGroup'


export default  {
    "AWS::EC2::Instance":EC2Instance,
    "AWS::EC2::SecurityGroup":EC2SecurityGroup
}