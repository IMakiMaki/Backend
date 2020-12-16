import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Photo } from './photo.entity';

@Entity()
export class User {
  constructor(user: User) {
    if (user) {
      this.firstName = user.firstName;
      this.isActive = user.isActive;
      this.lastName = user.lastName;
      this.password = user.password;
      this.photos = user.photos;
      this.userName = user.userName;
    }
  }
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userName: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  isActive: boolean;

  @Column()
  password: string;

  @OneToMany((type) => Photo, (photo) => photo.user)
  photos: Photo[];
}
