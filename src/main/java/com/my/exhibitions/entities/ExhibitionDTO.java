package com.my.exhibitions.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.Date;
import java.util.Set;

@AllArgsConstructor
@Builder
@Data
public class ExhibitionDTO {
    private long id;
    private String theme;
    private String description;
    private Date startDate;
    private Date endDate;
    private double price;
    private Set<String> hallsNames;

}
