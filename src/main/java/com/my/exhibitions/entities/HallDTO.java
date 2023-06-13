package com.my.exhibitions.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@AllArgsConstructor
@Builder
@Data
public class HallDTO {
    private long id;
    private String name;
    private String description;
}