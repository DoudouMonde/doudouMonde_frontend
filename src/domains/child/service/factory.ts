import { Gender } from "@/entities";
import { ChildFormValues } from "../models/ChildFormValues";
import { Profile } from "@/entities/types";

export const createNewChild =() : ChildFormValues => {
    return{
        name:"",
        birthday:"",
        gender: Gender.MALE,
        profile: Profile.DOG,
    }
}