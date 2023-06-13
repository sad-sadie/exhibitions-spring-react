package com.my.exhibitions.controllers;

import com.my.exhibitions.entities.*;
import com.my.exhibitions.services.ExhibitionService;
import com.my.exhibitions.services.HallService;
import com.my.exhibitions.services.UserService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@RestController
public class ExhibitionController {


    private static final Logger LOGGER = Logger.getLogger(ExhibitionController.class);
    private final ExhibitionService exhibitionService;
    private final HallService hallService;
    private final UserService userService;

    @Autowired
    public ExhibitionController(ExhibitionService exhibitionService,
                                HallService hallService,
                                UserService userService) {
        this.exhibitionService = exhibitionService;
        this.hallService = hallService;
        this.userService = userService;
    }


    @GetMapping("/addExhibition")
    public String getAddExhibition(Model model) {
        LOGGER.info("Get -> /addExhibition");
        model.addAttribute("exhibition", new Exhibition());
        model.addAttribute("halls", hallService.findAll());
        return "addExhibition";
    }

    @PostMapping("/addExhibition")
    public void addNewExhibition(@RequestBody Exhibition exhibition
                                   /*@RequestParam(value = "chosenHalls", required = false) List<String> halls*/) {
        LOGGER.info("Post -> /addExhibition");
        boolean alreadyExists = exhibitionService.existsByTheme(exhibition.getTheme());
        if(!alreadyExists) {
            exhibitionService.save(exhibition);
        }
    }

    @GetMapping("/getExhibitions")
    public List<ExhibitionDTO> getExhibitions(@RequestParam(value = "pageNum", required = false, defaultValue = "1") int pageNum,
                                 @RequestParam(value = "sortType", required = false, defaultValue = "default") String sortType,
                                 @RequestParam(value = "exhibitionId", required = false) Optional<Long> exhibitionId,
                                 @RequestParam(value = "canceledExhibitionId", required = false) Optional<Long> canceledExhibitionId) {
        LOGGER.info("Get -> /getExhibition");

        exhibitionId.ifPresent(exhibitionService::addCustomer);
        canceledExhibitionId.ifPresent(exhibitionService::cancelExhibition);

        Page<Exhibition> page;
        if(sortType.equals("default")) {
            page = exhibitionService.getPage(pageNum - 1);
        } else {
            page = exhibitionService.getPage(pageNum - 1, sortType);
        }
       /* model.addAttribute("exhibitions", page.toList());
        model.addAttribute("sortType", sortType);
        model.addAttribute("currentPage", pageNum);*/
        int totalPages = page.getTotalPages();
        if (totalPages > 0) {
            List<Integer> pageNumbers = IntStream.rangeClosed(1, totalPages)
                    .boxed()
                    .collect(Collectors.toList());
         //   model.addAttribute("pageNumbers", pageNumbers);
        }

        /*Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username = ((UserDetails)principal).getUsername();*/
        String username = "admin";
      /*  model.addAttribute("user", userService.findByUsername(username));
        model.addAttribute("exhService", exhibitionService);*/
        //exhibitionService.getNumberOfTicketsBoughtForUserAtExhibition()

        List<ExhibitionDTO> collect = page.stream()
                .map(exhibition -> new ExhibitionDTO(exhibition.getId(), exhibition.getTheme(), exhibition.getDescription(),
                        exhibition.getStartDate(), exhibition.getEndDate(), exhibition.getPrice(),
                        exhibition.getHalls()
                                .stream()
                                .map(Hall::getName)
                                .collect(Collectors.toSet())))
                .collect(Collectors.toList());
        return collect;
    }

    @DeleteMapping("/getExhibitions/{id}")
    public void deleteExhibition(@PathVariable String id) {
        if(id != null) {
            exhibitionService.cancelExhibition(Integer.parseInt(id));
        }
    }

    @GetMapping("/getStats")
    public List<Statistic> getStats() {
        LOGGER.info("Get -> /getStats");
        return exhibitionService.getStats().entrySet()
                .stream()
                .map(stats -> new Statistic(stats.getKey().getId(), stats.getKey().getTheme(),
                        stats.getKey().getDescription(), stats.getKey().getStartDate(), stats.getKey().getEndDate(),
                        stats.getKey().getPrice(), stats.getValue(),
                        stats.getKey().getHalls()
                                .stream()
                                .map(Hall::getName)
                                .collect(Collectors.toList())))
                .collect(Collectors.toList());
    }

    @GetMapping("/getStats/{theme}")
    public List<DetailedStatistic> getDetailedStats(Model model, @PathVariable String theme) {
        LOGGER.info("Get -> /getStats{" + theme + "}");
        Exhibition exhibition = exhibitionService.findByTheme(theme);
        return exhibitionService.getDetailedStats(exhibition.getId()).entrySet()
                .stream()
                .map(stats -> new DetailedStatistic(stats.getKey(), stats.getValue()))
                .collect(Collectors.toList());
    }
}