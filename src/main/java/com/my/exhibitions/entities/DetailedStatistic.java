package com.my.exhibitions.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@AllArgsConstructor
@Builder
@Data
public class DetailedStatistic {
    private String username;
    private int numberOfTickets;
}
