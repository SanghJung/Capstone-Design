package com.capstone.picknic.domain.place;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;


@Entity
@Table(name = "place")
@Getter
@DiscriminatorValue("restaurant") // default is class name
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SuperBuilder
public class Restaurant extends Place{

}

