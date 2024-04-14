package com.capstone.picknic.domain.place;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;


@Entity
@Table(name = "restaurant")
@Getter
@DiscriminatorValue("restaurant") // default is class name
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SuperBuilder
public class Restaurant extends Place{

}

