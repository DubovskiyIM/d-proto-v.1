import { ApiProperty } from "@nestjs/swagger";

export class CreateImageDto {
    @ApiProperty({ example: 'avatar', description: 'Avatar image' })
    name: string;

    @ApiProperty({ example: 'Description of image', description: 'Image description' })
    description: string;

    @ApiProperty({ example: 'avatar', description: 'Type of image' })
    type: string;

    @ApiProperty({
        example: 'Buffer',
        description: 'Image file buffer',
    })
    img: {
        data: Buffer,
        contentType: String
    };
}
