package com.my.exhibitions.controllers;

import com.my.exhibitions.entities.Hall;
import com.my.exhibitions.entities.HallDTO;
import com.my.exhibitions.services.HallService;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.util.StreamUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@RestController
public class HallController {


    private final static Logger LOGGER = Logger.getLogger(HallController.class);
    private final HallService hallService;

    @Autowired
    public HallController(HallService hallService) {
        this.hallService = hallService;
    }

    @PostMapping("/addHall")
    public void addNewHall(@Valid @RequestBody Hall hall/*, BindingResult bindingResult*/) {
        LOGGER.info("Post -> /addHall");
        boolean alreadyExists = hallService.existsByName(hall.getName());
        if(!alreadyExists) {
            hallService.save(hall);
        }
    }

    @GetMapping("/getHalls")
    public Collection<HallDTO> getHalls(/*Model model,
                           @RequestParam(value = "pageNum", required = false, defaultValue = "1") int pageNum*/) {

        int pageNum = 1;
        LOGGER.info("Get -> /getHalls");
        Page<Hall> page = hallService.getPage(pageNum - 1);
        /*model.addAttribute("halls", page.toList());
        model.addAttribute("currentPage", pageNum);
        int totalPages = page.getTotalPages();
        if (totalPages > 0) {
            List<Integer> pageNumbers = IntStream.rangeClosed(1, totalPages)
                    .boxed()
                    .collect(Collectors.toList());
            model.addAttribute("pageNumbers", pageNumbers);
        }
       System.out.println(page.getContent());*/
        return page.stream()
                .map(hall -> new HallDTO(hall.getId(), hall.getName(), hall.getDescription()))
                .collect(Collectors.toList());
    }

    @GetMapping("/getAllHalls")
    public Collection<HallDTO> getAllHalls() {
       List<HallDTO> list =  hallService.findAll()
                .stream()
                .map(hall -> new HallDTO(hall.getId(), hall.getName(), hall.getDescription()))
                .collect(Collectors.toList());
       return list;
    }


}