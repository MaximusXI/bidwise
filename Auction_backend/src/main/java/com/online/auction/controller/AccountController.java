package com.online.auction.controller;

import com.online.auction.dto.SuccessResponse;
import com.online.auction.exception.ServiceException;
import com.online.auction.service.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import static com.online.auction.constant.AuctionConstants.ACCOUNT;
import static com.online.auction.constant.AuctionConstants.API_VERSION_V1;

@RestController
@RequestMapping(API_VERSION_V1 + ACCOUNT)
@RequiredArgsConstructor
public class AccountController {
    @Autowired
    private AccountService accountService;

    @GetMapping("/balance")
    public ResponseEntity<SuccessResponse<Float>> getAccountBalance(
            @RequestParam("userId") Integer userId) throws ServiceException {
        float balance = accountService.getAccountBalance(userId);
        SuccessResponse<Float> response = new SuccessResponse<>(200, HttpStatus.OK, balance);
        return ResponseEntity.ok(response);

    }
}
